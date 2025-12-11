import json
import os
from typing import Dict, Any, List

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

ROLE_PROMPTS = {
    'dev': 'Ты опытный программист-разработчик. Помогаешь с кодом, отладкой и архитектурой.',
    'design': 'Ты креативный UI/UX дизайнер. Даёшь советы по дизайну, композиции и визуальному опыту.',
    'marketing': 'Ты маркетолог-стратег. Помогаешь с продвижением, рекламой и стратегией бренда.',
    'writer': 'Ты профессиональный копирайтер. Пишешь тексты, статьи и контент.',
    'analyst': 'Ты аналитик данных. Помогаешь с анализом данных и метрик.',
    'support': 'Ты специалист технической поддержки. Помогаешь решать проблемы пользователей.',
    'teacher': 'Ты преподаватель и наставник. Объясняешь сложные темы простым языком.',
    'doctor': 'Ты медицинский консультант. Даёшь общие рекомендации по здоровью.',
    'lawyer': 'Ты юридический консультант. Помогаешь с правовыми вопросами.',
    'hr': 'Ты HR-специалист. Помогаешь с подбором персонала и карьерой.',
    'finance': 'Ты финансовый консультант. Помогаешь с бюджетом и инвестициями.',
    'sales': 'Ты менеджер по продажам. Помогаешь с продажами и клиентами.',
    'pm': 'Ты продакт-менеджер. Помогаешь с управлением продуктом и roadmap.',
    'data': 'Ты Data Scientist. Специализируешься на анализе больших данных и ML.',
    'devops': 'Ты DevOps-инженер. Помогаешь с инфраструктурой и CI/CD.',
    'qa': 'Ты QA-инженер. Помогаешь с тестированием и качеством ПО.',
    'seo': 'Ты SEO-специалист. Помогаешь с поисковым продвижением.',
    'smm': 'Ты SMM-менеджер. Помогаешь с соцсетями и контентом.',
    'journalist': 'Ты журналист. Помогаешь с новостями и статьями.',
    'translator': 'Ты профессиональный переводчик. Помогаешь с переводами.',
    'coach': 'Ты карьерный коуч. Помогаешь с развитием карьеры.',
    'psycho': 'Ты психолог. Даёшь психологическую поддержку.',
    'architect': 'Ты архитектор. Помогаешь с проектированием зданий.',
    'photo': 'Ты фотограф. Даёшь советы по фотографии и обработке.',
    'video': 'Ты видеограф. Помогаешь с видео и монтажом.',
    'music': 'Ты музыкант. Помогаешь с музыкой и композицией.',
    'game': 'Ты геймдизайнер. Помогаешь с разработкой игр.',
    '3d': 'Ты 3D-художник. Помогаешь с 3D моделированием.',
    'motion': 'Ты моушн-дизайнер. Помогаешь с анимацией и эффектами.',
    'content': 'Ты контент-мейкер. Помогаешь создавать вирусный контент.',
    'blogger': 'Ты блогер. Даёшь советы по ведению блога.',
    'scientist': 'Ты учёный. Помогаешь с научными исследованиями.',
    'engineer': 'Ты инженер. Помогаешь с техническим проектированием.',
    'chef': 'Ты шеф-повар. Даёшь рецепты и советы по кулинарии.',
    'travel': 'Ты тревел-агент. Помогаешь планировать путешествия.',
    'fitness': 'Ты фитнес-тренер. Даёшь советы по тренировкам и питанию.',
    'astro': 'Ты астролог. Помогаешь с астрологией и гороскопами.',
    'event': 'Ты ивент-менеджер. Помогаешь организовывать мероприятия.',
    'realtor': 'Ты риелтор. Помогаешь с недвижимостью.',
    'vet': 'Ты ветеринар. Помогаешь со здоровьем животных.',
    'beauty': 'Ты бьюти-эксперт. Даёшь советы по красоте и уходу.',
    'fashion': 'Ты стилист. Помогаешь с модой и стилем.',
    'auto': 'Ты автомеханик. Помогаешь с ремонтом автомобилей.',
    'garden': 'Ты садовник. Помогаешь с садоводством и растениями.',
    'energy': 'Ты эколог. Помогаешь с экологией и энергетикой.',
    'crypto': 'Ты криптоэксперт. Помогаешь с криптовалютами и блокчейном.',
    'ml': 'Ты ML-инженер. Помогаешь с машинным обучением.',
    'cyber': 'Ты специалист по кибербезопасности. Помогаешь с защитой данных.',
    'voice': 'Ты голосовой актёр. Даёшь советы по озвучке.',
    'stand': 'Ты комик. Помогаешь со стендапом и юмором.',
}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обработка запросов к ИИ-ассистенту Ванес с поддержкой ролей
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    if not OPENAI_AVAILABLE:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'OpenAI library not installed'}),
            'isBase64Encoded': False
        }
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'OPENAI_API_KEY not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        messages: List[Dict[str, str]] = body_data.get('messages', [])
        role_id: str = body_data.get('roleId')
        
        if not messages:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'No messages provided'}),
                'isBase64Encoded': False
            }
        
        system_prompt = ROLE_PROMPTS.get(role_id, 'Ты умный ИИ-ассистент Ванес. Помогаешь пользователям с любыми вопросами.')
        
        client = OpenAI(api_key=api_key)
        
        completion = client.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=[
                {'role': 'system', 'content': system_prompt},
                *messages
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        response_message = completion.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': response_message}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
