export interface AIRole {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  category: string;
}

export interface AICategory {
  id: string;
  name: string;
  icon: string;
  roles: AIRole[];
}

export const aiCategories: AICategory[] = [
  {
    id: 'tech',
    name: 'Технологии и IT',
    icon: 'Laptop',
    roles: [
      { id: 'dev', name: 'Разработчик', icon: 'Code2', description: 'Помощь с кодом', color: 'from-purple-500 to-pink-500', category: 'tech' },
      { id: 'devops', name: 'DevOps', icon: 'Server', description: 'Инфраструктура', color: 'from-slate-500 to-gray-500', category: 'tech' },
      { id: 'qa', name: 'Тестировщик', icon: 'Bug', description: 'Тестирование ПО', color: 'from-red-500 to-orange-500', category: 'tech' },
      { id: 'data', name: 'Data Scientist', icon: 'Database', description: 'Анализ данных', color: 'from-blue-500 to-indigo-500', category: 'tech' },
      { id: 'ml', name: 'ML-инженер', icon: 'BrainCircuit', description: 'Машинное обучение', color: 'from-blue-500 to-indigo-500', category: 'tech' },
      { id: 'cyber', name: 'Кибербезопасность', icon: 'Shield', description: 'Защита данных', color: 'from-red-500 to-orange-500', category: 'tech' },
      { id: 'blockchain', name: 'Блокчейн', icon: 'Link', description: 'Смарт-контракты', color: 'from-orange-500 to-amber-500', category: 'tech' },
      { id: 'cloud', name: 'Облачный архитектор', icon: 'Cloud', description: 'AWS, Azure, GCP', color: 'from-sky-500 to-blue-500', category: 'tech' },
      { id: 'mobile', name: 'Мобильный разработчик', icon: 'Smartphone', description: 'iOS/Android', color: 'from-green-500 to-teal-500', category: 'tech' },
      { id: 'frontend', name: 'Frontend', icon: 'Monitor', description: 'React, Vue, Angular', color: 'from-cyan-500 to-blue-500', category: 'tech' },
      { id: 'backend', name: 'Backend', icon: 'HardDrive', description: 'API и сервера', color: 'from-purple-500 to-violet-500', category: 'tech' },
      { id: 'fullstack', name: 'Fullstack', icon: 'Layers', description: 'Frontend + Backend', color: 'from-indigo-500 to-purple-500', category: 'tech' },
      { id: 'db', name: 'DBA', icon: 'Database', description: 'Базы данных', color: 'from-emerald-500 to-green-500', category: 'tech' },
      { id: 'network', name: 'Сетевой инженер', icon: 'Network', description: 'Сети и протоколы', color: 'from-gray-500 to-slate-500', category: 'tech' },
      { id: 'embedded', name: 'Embedded', icon: 'Cpu', description: 'IoT и микроконтроллеры', color: 'from-orange-500 to-red-500', category: 'tech' },
      { id: 'gamedev', name: 'Геймдев', icon: 'Gamepad2', description: 'Unity, Unreal', color: 'from-green-500 to-emerald-500', category: 'tech' },
      { id: 'vr', name: 'VR/AR', icon: 'Glasses', description: 'Виртуальная реальность', color: 'from-purple-500 to-pink-500', category: 'tech' },
      { id: 'ai', name: 'AI Engineer', icon: 'Bot', description: 'ИИ и нейросети', color: 'from-violet-500 to-purple-500', category: 'tech' },
      { id: 'automation', name: 'Автоматизация', icon: 'Workflow', description: 'RPA и скрипты', color: 'from-yellow-500 to-orange-500', category: 'tech' },
      { id: 'sysadmin', name: 'Сисадмин', icon: 'ServerCog', description: 'Администрирование', color: 'from-slate-500 to-gray-500', category: 'tech' },
    ]
  },
  {
    id: 'design',
    name: 'Дизайн и креатив',
    icon: 'Palette',
    roles: [
      { id: 'ux', name: 'UX дизайнер', icon: 'MousePointerClick', description: 'Пользовательский опыт', color: 'from-pink-500 to-rose-500', category: 'design' },
      { id: 'ui', name: 'UI дизайнер', icon: 'Layout', description: 'Интерфейсы', color: 'from-purple-500 to-pink-500', category: 'design' },
      { id: 'graphic', name: 'Графический дизайнер', icon: 'Palette', description: 'Графика и брендинг', color: 'from-orange-500 to-red-500', category: 'design' },
      { id: 'web-design', name: 'Веб-дизайнер', icon: 'Globe', description: 'Дизайн сайтов', color: 'from-blue-500 to-cyan-500', category: 'design' },
      { id: '3d', name: '3D-художник', icon: 'Box', description: '3D моделирование', color: 'from-cyan-500 to-blue-500', category: 'design' },
      { id: 'motion', name: 'Моушн-дизайн', icon: 'Film', description: 'Анимация', color: 'from-orange-500 to-red-500', category: 'design' },
      { id: 'illustrator', name: 'Иллюстратор', icon: 'Pencil', description: 'Иллюстрации', color: 'from-pink-500 to-purple-500', category: 'design' },
      { id: 'photo', name: 'Фотограф', icon: 'Camera', description: 'Фотография', color: 'from-sky-500 to-blue-500', category: 'design' },
      { id: 'video', name: 'Видеограф', icon: 'Video', description: 'Видеосъёмка', color: 'from-red-500 to-pink-500', category: 'design' },
      { id: 'product-design', name: 'Продуктовый дизайнер', icon: 'Package', description: 'Дизайн продуктов', color: 'from-green-500 to-emerald-500', category: 'design' },
      { id: 'brand', name: 'Брендинг', icon: 'Award', description: 'Айдентика', color: 'from-yellow-500 to-orange-500', category: 'design' },
      { id: 'typography', name: 'Типограф', icon: 'Type', description: 'Шрифты и вёрстка', color: 'from-gray-500 to-slate-500', category: 'design' },
      { id: 'packaging', name: 'Упаковка', icon: 'Package', description: 'Дизайн упаковки', color: 'from-teal-500 to-cyan-500', category: 'design' },
      { id: 'print', name: 'Полиграфия', icon: 'FileText', description: 'Печатная продукция', color: 'from-indigo-500 to-violet-500', category: 'design' },
      { id: 'architect', name: 'Архитектор', icon: 'Building2', description: 'Проектирование зданий', color: 'from-gray-500 to-zinc-500', category: 'design' },
      { id: 'interior', name: 'Интерьер', icon: 'Sofa', description: 'Дизайн интерьера', color: 'from-amber-500 to-orange-500', category: 'design' },
      { id: 'landscape', name: 'Ландшафт', icon: 'Trees', description: 'Ландшафтный дизайн', color: 'from-green-500 to-lime-500', category: 'design' },
      { id: 'fashion', name: 'Стилист', icon: 'Shirt', description: 'Мода и стиль', color: 'from-purple-500 to-pink-500', category: 'design' },
      { id: 'makeup', name: 'Визажист', icon: 'Sparkles', description: 'Макияж', color: 'from-pink-500 to-fuchsia-500', category: 'design' },
      { id: 'jewelry', name: 'Ювелир', icon: 'Gem', description: 'Ювелирный дизайн', color: 'from-yellow-500 to-amber-500', category: 'design' },
    ]
  },
  {
    id: 'marketing',
    name: 'Маркетинг и продажи',
    icon: 'TrendingUp',
    roles: [
      { id: 'marketing', name: 'Маркетолог', icon: 'TrendingUp', description: 'Стратегия и продвижение', color: 'from-blue-500 to-cyan-500', category: 'marketing' },
      { id: 'smm', name: 'SMM-менеджер', icon: 'Share2', description: 'Соцсети', color: 'from-pink-500 to-rose-500', category: 'marketing' },
      { id: 'seo', name: 'SEO-специалист', icon: 'Search', description: 'Поисковое продвижение', color: 'from-green-500 to-teal-500', category: 'marketing' },
      { id: 'ppc', name: 'Контекстолог', icon: 'Target', description: 'Контекстная реклама', color: 'from-orange-500 to-red-500', category: 'marketing' },
      { id: 'content', name: 'Контент-маркетолог', icon: 'FileEdit', description: 'Контент-стратегия', color: 'from-purple-500 to-pink-500', category: 'marketing' },
      { id: 'email', name: 'Email-маркетинг', icon: 'Mail', description: 'Рассылки', color: 'from-blue-500 to-indigo-500', category: 'marketing' },
      { id: 'crm', name: 'CRM-менеджер', icon: 'Users', description: 'Управление клиентами', color: 'from-teal-500 to-cyan-500', category: 'marketing' },
      { id: 'sales', name: 'Менеджер продаж', icon: 'ShoppingCart', description: 'Продажи', color: 'from-orange-500 to-amber-500', category: 'marketing' },
      { id: 'affiliate', name: 'Партнёрский маркетинг', icon: 'Handshake', description: 'Партнёрки', color: 'from-green-500 to-emerald-500', category: 'marketing' },
      { id: 'growth', name: 'Growth хакер', icon: 'Rocket', description: 'Рост продукта', color: 'from-violet-500 to-purple-500', category: 'marketing' },
      { id: 'pr', name: 'PR-менеджер', icon: 'Megaphone', description: 'PR и медиа', color: 'from-pink-500 to-fuchsia-500', category: 'marketing' },
      { id: 'event', name: 'Ивент-менеджер', icon: 'CalendarCheck', description: 'Организация мероприятий', color: 'from-pink-500 to-rose-500', category: 'marketing' },
      { id: 'brand-manager', name: 'Бренд-менеджер', icon: 'Bookmark', description: 'Управление брендом', color: 'from-yellow-500 to-orange-500', category: 'marketing' },
      { id: 'influencer', name: 'Инфлюенс-маркетинг', icon: 'Star', description: 'Работа с блогерами', color: 'from-purple-500 to-pink-500', category: 'marketing' },
      { id: 'market-research', name: 'Маркетинговый аналитик', icon: 'BarChart3', description: 'Анализ рынка', color: 'from-blue-500 to-cyan-500', category: 'marketing' },
      { id: 'copywriter', name: 'Копирайтер', icon: 'PenTool', description: 'Продающие тексты', color: 'from-green-500 to-emerald-500', category: 'marketing' },
      { id: 'community', name: 'Комьюнити-менеджер', icon: 'Users2', description: 'Управление сообществом', color: 'from-indigo-500 to-violet-500', category: 'marketing' },
      { id: 'retargeting', name: 'Ретаргетолог', icon: 'RefreshCw', description: 'Возврат клиентов', color: 'from-orange-500 to-red-500', category: 'marketing' },
      { id: 'conversion', name: 'CRO-специалист', icon: 'Activity', description: 'Оптимизация конверсий', color: 'from-green-500 to-teal-500', category: 'marketing' },
      { id: 'trade', name: 'Трейд-маркетолог', icon: 'Store', description: 'Торговый маркетинг', color: 'from-amber-500 to-yellow-500', category: 'marketing' },
    ]
  },
  {
    id: 'content',
    name: 'Контент и медиа',
    icon: 'FileText',
    roles: [
      { id: 'writer', name: 'Копирайтер', icon: 'PenTool', description: 'Тексты и статьи', color: 'from-green-500 to-emerald-500', category: 'content' },
      { id: 'journalist', name: 'Журналист', icon: 'Newspaper', description: 'Новости', color: 'from-amber-500 to-yellow-500', category: 'content' },
      { id: 'blogger', name: 'Блогер', icon: 'User', description: 'Ведение блога', color: 'from-yellow-500 to-orange-500', category: 'content' },
      { id: 'screenwriter', name: 'Сценарист', icon: 'Clapperboard', description: 'Сценарии', color: 'from-purple-500 to-pink-500', category: 'content' },
      { id: 'editor', name: 'Редактор', icon: 'FileEdit', description: 'Редактура текстов', color: 'from-blue-500 to-indigo-500', category: 'content' },
      { id: 'proofreader', name: 'Корректор', icon: 'Check', description: 'Проверка текстов', color: 'from-green-500 to-teal-500', category: 'content' },
      { id: 'translator', name: 'Переводчик', icon: 'Languages', description: 'Перевод текстов', color: 'from-indigo-500 to-violet-500', category: 'content' },
      { id: 'podcaster', name: 'Подкастер', icon: 'Mic', description: 'Подкасты', color: 'from-orange-500 to-red-500', category: 'content' },
      { id: 'voice', name: 'Голосовой актёр', icon: 'Mic', description: 'Озвучка', color: 'from-purple-500 to-violet-500', category: 'content' },
      { id: 'streamer', name: 'Стример', icon: 'Radio', description: 'Стриминг', color: 'from-red-500 to-pink-500', category: 'content' },
      { id: 'vlogger', name: 'Влогер', icon: 'VideoIcon', description: 'Видеоблог', color: 'from-cyan-500 to-blue-500', category: 'content' },
      { id: 'content-creator', name: 'Контент-мейкер', icon: 'Clapperboard', description: 'Создание контента', color: 'from-pink-500 to-purple-500', category: 'content' },
      { id: 'tiktoker', name: 'TikTok-креатор', icon: 'Music', description: 'Короткие видео', color: 'from-pink-500 to-fuchsia-500', category: 'content' },
      { id: 'youtuber', name: 'YouTuber', icon: 'Youtube', description: 'YouTube контент', color: 'from-red-500 to-orange-500', category: 'content' },
      { id: 'photographer', name: 'Фотограф', icon: 'Camera', description: 'Фотосъёмка', color: 'from-sky-500 to-blue-500', category: 'content' },
      { id: 'videographer', name: 'Видеограф', icon: 'Video', description: 'Видеосъёмка', color: 'from-red-500 to-pink-500', category: 'content' },
      { id: 'montage', name: 'Монтажёр', icon: 'Film', description: 'Видеомонтаж', color: 'from-purple-500 to-indigo-500', category: 'content' },
      { id: 'colorist', name: 'Колорист', icon: 'Droplet', description: 'Цветокоррекция', color: 'from-orange-500 to-amber-500', category: 'content' },
      { id: 'sound', name: 'Звукорежиссёр', icon: 'Headphones', description: 'Звук', color: 'from-green-500 to-emerald-500', category: 'content' },
      { id: 'musician', name: 'Музыкант', icon: 'Music', description: 'Музыка', color: 'from-purple-500 to-pink-500', category: 'content' },
    ]
  },
  {
    id: 'business',
    name: 'Бизнес и управление',
    icon: 'Briefcase',
    roles: [
      { id: 'pm', name: 'Продакт-менеджер', icon: 'Target', description: 'Управление продуктом', color: 'from-violet-500 to-purple-500', category: 'business' },
      { id: 'ceo', name: 'Директор', icon: 'Crown', description: 'Управление компанией', color: 'from-yellow-500 to-amber-500', category: 'business' },
      { id: 'cfo', name: 'Финансовый директор', icon: 'DollarSign', description: 'Финансы', color: 'from-emerald-500 to-green-500', category: 'business' },
      { id: 'cto', name: 'Техдиректор', icon: 'Settings', description: 'Технологии', color: 'from-blue-500 to-indigo-500', category: 'business' },
      { id: 'cmo', name: 'Маркетинг-директор', icon: 'TrendingUp', description: 'Маркетинг', color: 'from-pink-500 to-rose-500', category: 'business' },
      { id: 'hr', name: 'HR-специалист', icon: 'Users2', description: 'Подбор персонала', color: 'from-teal-500 to-cyan-500', category: 'business' },
      { id: 'recruiter', name: 'Рекрутер', icon: 'UserPlus', description: 'Найм сотрудников', color: 'from-green-500 to-teal-500', category: 'business' },
      { id: 'coach', name: 'Бизнес-коуч', icon: 'Trophy', description: 'Развитие бизнеса', color: 'from-yellow-500 to-orange-500', category: 'business' },
      { id: 'consultant', name: 'Консультант', icon: 'Lightbulb', description: 'Бизнес-консалтинг', color: 'from-amber-500 to-yellow-500', category: 'business' },
      { id: 'analyst', name: 'Бизнес-аналитик', icon: 'BarChart3', description: 'Анализ бизнеса', color: 'from-blue-500 to-cyan-500', category: 'business' },
      { id: 'strategist', name: 'Стратег', icon: 'Map', description: 'Стратегия', color: 'from-purple-500 to-indigo-500', category: 'business' },
      { id: 'accountant', name: 'Бухгалтер', icon: 'Calculator', description: 'Учёт и отчётность', color: 'from-gray-500 to-slate-500', category: 'business' },
      { id: 'lawyer', name: 'Юрист', icon: 'Scale', description: 'Правовые вопросы', color: 'from-gray-500 to-slate-500', category: 'business' },
      { id: 'notary', name: 'Нотариус', icon: 'FileSignature', description: 'Заверение документов', color: 'from-indigo-500 to-violet-500', category: 'business' },
      { id: 'auditor', name: 'Аудитор', icon: 'ClipboardCheck', description: 'Проверка отчётности', color: 'from-emerald-500 to-green-500', category: 'business' },
      { id: 'investor', name: 'Инвестор', icon: 'TrendingUp', description: 'Инвестиции', color: 'from-green-500 to-emerald-500', category: 'business' },
      { id: 'startup', name: 'Стартап-фаундер', icon: 'Rocket', description: 'Запуск стартапов', color: 'from-orange-500 to-red-500', category: 'business' },
      { id: 'franchise', name: 'Франчайзинг', icon: 'Store', description: 'Франшизы', color: 'from-blue-500 to-cyan-500', category: 'business' },
      { id: 'export', name: 'Экспорт-менеджер', icon: 'Globe', description: 'Внешняя торговля', color: 'from-cyan-500 to-blue-500', category: 'business' },
      { id: 'logistics', name: 'Логист', icon: 'Truck', description: 'Логистика', color: 'from-orange-500 to-amber-500', category: 'business' },
    ]
  }
];

export const getAllRoles = (): AIRole[] => {
  return aiCategories.flatMap(cat => cat.roles);
};

export const getRolesByCategory = (categoryId: string): AIRole[] => {
  const category = aiCategories.find(cat => cat.id === categoryId);
  return category ? category.roles : [];
};
