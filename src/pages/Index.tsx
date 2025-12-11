import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { aiCategories, getAllRoles, type AIRole } from '@/data/aiCategories';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const allRoles = getAllRoles();

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я Ванес — ваш ИИ-ассистент. Выберите роль или начните общение!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeSection, setActiveSection] = useState<'chat' | 'history' | 'settings' | 'roles'>('chat');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/b2d6802e-3702-4b9c-a555-c342b849d784', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newMessage].map(m => ({ role: m.role, content: m.content })),
          roleId: selectedRole,
        }),
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Произошла ошибка при получении ответа.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Ошибка подключения к API. Проверьте настройки.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectRole = (roleId: string) => {
    setSelectedRole(roleId);
    const role = allRoles.find((r) => r.id === roleId);
    if (role) {
      const message: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Режим "${role.name}" активирован! ${role.description}`,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setActiveSection('chat');
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div
        className={`glass border-r border-white/10 transition-all duration-300 ${
          sidebarOpen ? 'w-72' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center neon-glow">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Ванес</h1>
              <p className="text-xs text-muted-foreground">ИИ Ассистент</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActiveSection('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === 'chat'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-white/5'
              }`}
            >
              <Icon name="MessageSquare" size={20} />
              <span className="font-medium">Чат</span>
            </button>

            <button
              onClick={() => setActiveSection('roles')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === 'roles'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-white/5'
              }`}
            >
              <Icon name="Users" size={20} />
              <span className="font-medium">ИИ по ролям</span>
            </button>

            <button
              onClick={() => setActiveSection('history')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === 'history'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-white/5'
              }`}
            >
              <Icon name="Clock" size={20} />
              <span className="font-medium">История</span>
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === 'settings'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-white/5'
              }`}
            >
              <Icon name="Settings" size={20} />
              <span className="font-medium">Настройки</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10">
            <Button variant="outline" className="w-full gap-2" size="sm">
              <Icon name="Plus" size={16} />
              Новый чат
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-white/10"
            >
              <Icon name={sidebarOpen ? 'PanelLeftClose' : 'PanelLeftOpen'} size={20} />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">
                {activeSection === 'chat' && 'Чат с Ванес'}
                {activeSection === 'roles' && 'Выбор роли ИИ'}
                {activeSection === 'history' && 'История чатов'}
                {activeSection === 'settings' && 'Настройки'}
              </h2>
              {selectedRole && (
                <Badge className="mt-1 bg-primary/20 text-primary border-primary/30">
                  {allRoles.find((r) => r.id === selectedRole)?.name}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="Download" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="Trash2" size={20} />
            </Button>
          </div>
        </header>

        {activeSection === 'chat' && (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 animate-fade-in ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className="w-10 h-10 border-2 border-white/20">
                      <div
                        className={`w-full h-full flex items-center justify-center ${
                          message.role === 'assistant'
                            ? 'bg-gradient-to-br from-primary to-secondary'
                            : 'bg-gradient-to-br from-accent to-primary'
                        }`}
                      >
                        <Icon
                          name={message.role === 'assistant' ? 'Bot' : 'User'}
                          size={20}
                          className="text-white"
                        />
                      </div>
                    </Avatar>
                    <div
                      className={`flex-1 ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}
                    >
                      <div
                        className={`inline-block glass px-6 py-4 rounded-2xl max-w-2xl ${
                          message.role === 'user' ? 'bg-primary/10' : ''
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.timestamp.toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 animate-fade-in">
                    <Avatar className="w-10 h-10 border-2 border-white/20">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                        <Icon name="Bot" size={20} className="text-white" />
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="inline-block glass px-6 py-4 rounded-2xl">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="glass border-t border-white/10 p-6">
              <div className="max-w-4xl mx-auto flex gap-3">
                <Input
                  placeholder="Напишите сообщение..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="glass border-white/20 bg-white/5 text-white placeholder:text-muted-foreground"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? (
                    <Icon name="Loader2" size={20} className="animate-spin" />
                  ) : (
                    <Icon name="Send" size={20} />
                  )}
                </Button>
              </div>
            </div>
          </>
        )}

        {activeSection === 'roles' && (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold mb-2 gradient-text">Выберите специализацию ИИ</h3>
              <p className="text-muted-foreground mb-8">
                100+ профессиональных ролей в 5 категориях
              </p>
              
              <Tabs defaultValue={aiCategories[0].id} className="w-full">
                <TabsList className="glass mb-8 p-2 h-auto flex-wrap justify-start">
                  {aiCategories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="gap-2 data-[state=active]:bg-primary/20"
                    >
                      <Icon name={category.icon as any} size={16} />
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {aiCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.roles.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => selectRole(role.id)}
                          className="glass p-4 rounded-xl hover:scale-105 transition-all duration-300 text-left group"
                        >
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-3 group-hover:neon-glow transition-all`}
                          >
                            <Icon name={role.icon as any} size={22} className="text-white" />
                          </div>
                          <h4 className="text-base font-semibold mb-1">{role.name}</h4>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        )}

        {activeSection === 'history' && (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">История чатов</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass p-5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Чат #{i}</h4>
                      <span className="text-xs text-muted-foreground">
                        {new Date().toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Последнее сообщение в этом чате...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Настройки</h3>
              <div className="space-y-6">
                <div className="glass p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">Параметры</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Температура генерации</span>
                      <Badge variant="secondary">0.7</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Максимум токенов</span>
                      <Badge variant="secondary">2048</Badge>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">Синхронизация</h4>
                  <Button variant="outline" className="w-full">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Синхронизировать
                  </Button>
                </div>

                <div className="glass p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">Управление данными</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить чат
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить чат
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;