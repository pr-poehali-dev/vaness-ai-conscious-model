import json
import urllib.request
import urllib.error
from typing import Dict, Any, List

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

def call_huggingface_api(prompt: str, max_length: int = 200) -> str:
    """Вызов Hugging Face Inference API без ключа"""
    api_url = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
    
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_length": max_length,
            "temperature": 0.7,
            "return_full_text": False
        }
    }
    
    try:
        req = urllib.request.Request(
            api_url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            if isinstance(result, list) and len(result) > 0:
                return result[0].get('generated_text', 'Извините, не могу ответить.')
            return 'Извините, произошла ошибка при генерации ответа.'
            
    except urllib.error.HTTPError as e:
        if e.code == 503:
            return 'Модель загружается, попробуйте через 20 секунд...'
        return f'Ошибка API: {e.code}'
    except Exception as e:
        return f'Ошибка: {str(e)}'

def generate_smart_response(messages: List[Dict[str, str]], role_id: str) -> str:
    """Генерация умного ответа с учётом роли"""
    system_prompt = ROLE_PROMPTS.get(role_id, 'Ты умный ИИ-ассистент Ванес.')
    
    last_user_message = ''
    for msg in reversed(messages):
        if msg.get('role') == 'user':
            last_user_message = msg.get('content', '')
            break
    
    if not last_user_message:
        return 'Пожалуйста, задайте вопрос.'
    
    full_prompt = f"{system_prompt}\n\nВопрос: {last_user_message}\n\nОтвет:"
    
    response = call_huggingface_api(full_prompt, max_length=300)
    
    if not response or 'Ошибка' in response or 'загружается' in response:
        return generate_fallback_response(last_user_message, role_id)
    
    return response

def generate_fallback_response(question: str, role_id: str) -> str:
    """Локальный fallback-ответ если API недоступен"""
    role_name = ROLE_PROMPTS.get(role_id, 'ИИ-ассистент')
    
    responses = {
        'dev': f'Как разработчик, я рекомендую: разбить задачу на этапы, изучить документацию и написать тесты. По вопросу "{question[:50]}..." - начните с анализа требований.',
        'design': f'С точки зрения дизайна, важно учитывать UX. По вашему вопросу "{question[:50]}..." - фокусируйтесь на простоте и удобстве пользователя.',
        'marketing': f'В маркетинге ключевое - знать аудиторию. Относительно "{question[:50]}..." - проанализируйте целевую аудиторию и конкурентов.',
        'writer': f'Как копирайтер советую: будьте конкретны, пишите просто. По теме "{question[:50]}..." - начните с чёткой структуры текста.',
        'teacher': f'Давайте разберём это по шагам. Вопрос "{question[:50]}..." требует системного подхода. Начнём с основ и постепенно углубимся.',
        'psycho': f'Понимаю ваш вопрос. "{question[:50]}..." - это важная тема. Давайте подойдём к этому с позиции самоанализа и понимания.',
    }
    
    return responses.get(role_id, f'Спасибо за вопрос "{question[:50]}...". Я готов помочь! Уточните детали, и я дам более конкретный ответ.')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обработка запросов к ИИ-ассистенту Ванес (без API ключей)
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
        
        response_message = generate_smart_response(messages, role_id)
        
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
