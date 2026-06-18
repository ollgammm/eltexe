'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TG_TOKEN: string = '8507762662:AAHJ2fdVvTXZrOlhYkiujA54pnoK3Ho0AYs';
const TG_CHAT_ID: string = '-5175306815';
const SITE: string = 'eltexalatau.kz';
const TG_ON: boolean = TG_TOKEN !== '';

const PHONE_NUDGES = [
  '\n\nОставьте номер телефона — менеджер перезвонит в течении 1 часа.',
  '\n\nУкажите контактный номер, и менеджер подберёт решение под вашу задачу.',
  '\n\nНапишите номер телефона — подготовим коммерческое предложение.',
  '\n\nОставьте контакт — свяжемся и ответим на все вопросы.',
];

let nudgeIndex = 0;
function getNextNudge() {
  const nudge = PHONE_NUDGES[nudgeIndex % PHONE_NUDGES.length];
  nudgeIndex++;
  return nudge;
}

function containsPhone(text: string): boolean {
  return (
    /(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/.test(text) ||
    /\d{10,11}/.test(text.replace(/[\s\-\(\)]/g, ''))
  );
}

async function callAI(history: { role: string; content: string }[]): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history }),
    });
    if (!res.ok) {
      if (res.status === 401) return 'Ошибка авторизации. Проверьте API ключ.';
      if (res.status === 429) return 'Слишком много запросов. Попробуйте через несколько секунд.';
      return fallback(history.at(-1)?.content ?? '');
    }
    const data = await res.json();
    return data.text || fallback(history.at(-1)?.content ?? '');
  } catch (err) {
    console.error('callAI error:', err);
    return fallback(history.at(-1)?.content ?? '');
  }
}

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
  showPhoneCta?: boolean;
}

function nowTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function makeSID() {
  return '#' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function fallback(q: string): string {
  const t = q.toLowerCase();
  if (/цен|прайс|стоим|сколько|баға/.test(t))
    return 'Для получения коммерческого предложения оставьте ваше имя и номер телефона, менеджер свяжется с вами в ближайшее время.';
  if (/коммутатор|switch|mes/.test(t))
    return 'Ethernet-коммутаторы Eltex MES:\n— Доступ: 100M, 1G/2.5G/10G, PoE\n— Агрегация и Ядро/ЦОД: 10G–100G\n— Промышленные коммутаторы\n\neltexalatau.kz';
  if (/gpon|pon|ont|olt|xpon/.test(t))
    return 'Оборудование xPON:\n— GPON и 10G-PON\n— Станционные OLT и абонентские ONT\n\neltexalatau.kz';
  if (/маршрутизатор|роутер|esr|vesr/.test(t))
    return 'Маршрутизаторы Eltex ESR:\n— Сервисные ESR, виртуальные vESR\n— Маршрутизаторы ядра сети\n\neltexalatau.kz';
  if (/wi.?fi|wifi|точк|wireless|радиомост|бшпд|lte/.test(t))
    return 'Беспроводной доступ:\n— INDOOR и OUTDOOR точки доступа Wi-Fi\n— Контроллеры, радиомосты БШПД, LTE\n\neltexalatau.kz';
  if (/voip|ip.?тел|шлюз|sip|атс|sbc|fxs/.test(t))
    return 'VoIP-телефония:\n— IP-телефоны и IP-АТС\n— Шлюзы 1–72 порта FXS\n— Транковые шлюзы, SBC\n\neltexalatau.kz';
  if (/softswitch|call|ivr|сорм/.test(t))
    return 'Softswitch и сервисы:\n— Call-центры, IVR, автообзвон\n— Запись разговоров (REC), СОРМ\n\nСвяжитесь с менеджером для демонстрации.';
  if (/iptv|приставк|медиацентр|android/.test(t))
    return 'IPTV медиацентры Eltex:\n— Приставки на Android\n— Брендированные пульты\n\nЗапросите спецификации у менеджеров.';
  if (/iot|умный.?дом|датчик|контроллер|автоматизац/.test(t))
    return 'IoT и автоматизация:\n— IoT-платформа и контроллеры умного дома\n— Промышленные контроллеры и датчики\n\neltexalatau.kz';
  if (/sfp|qsfp|оптик|dac|aoc|кабел/.test(t))
    return 'SFP модули и кабели:\n— SFP 1G, SFP+ 10G, SFP28 25G, QSFP28 100G\n— DAC и AOC кабели\n\nНапишите менеджеру для подбора.';
  if (/менеджер|оператор|позвон|связь|контакт/.test(t))
    return 'Отдел продаж:\n+7 727 339-76-10\n+7 701 467-36-49\neltexalatau.kz';
  if (/привет|здравствуй|сәлем|hello/.test(t))
    return 'Здравствуйте. Я AI-консультант Аида. Отвечу на вопросы по сетевому оборудованию Eltex. Чем могу помочь?';
  if (/спасибо|рахмет|thanks/.test(t)) return 'Пожалуйста. Если возникнут вопросы — пишите.';
  return 'Для подбора оборудования под ваше техническое задание напишите название проекта, конечного заказчика, ваше имя и номер телефона, менеджер свяжется с вами в ближайшее время ';
}

async function tgSend(text: string) {
  if (!TG_ON) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

const QUICK_CHIPS = [
  { label: 'Цены', text: 'Цены на коммутаторы?' },
  { label: 'Коммутатор MES', text: 'Нужен коммутатор MES' },
  { label: 'Маршрутизатор ESR', text: 'Нужен маршрутизатор ESR' },
  { label: 'xPON ONT OLT', text: 'Интересует xPON ONT OLT' },
  { label: 'Wi-Fi', text: 'Нужны Wi-Fi точки доступа' },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [escalated, setEscalated] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [sessionId] = useState(() => makeSID());
  const [openTime] = useState(() => nowTime());
  const [phoneReceived, setPhoneReceived] = useState(false);
  const [showPhoneBar, setShowPhoneBar] = useState(false);

  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const apiHistory = useRef<{ role: string; content: string }[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const msgCountRef = useRef(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setMessages([
        {
          role: 'bot',
          text: 'Здравствуйте.\n\nЯ AI-консультант Аида. Отвечу на вопросы по коммутаторам, GPON, Wi-Fi и VoIP оборудованию.',
          time: nowTime(),
        },
      ]);
    }, 600);

    const t2 = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Укажите ваше имя и контактный номер телефона — менеджер свяжется с вами лично.',
          time: nowTime(),
          showPhoneCta: true,
        },
      ]);
      setShowPhoneBar(true);
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const showToastMsg = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);
/**
 * Проверяет, состоит ли номер телефона ровно из 11 цифр.
 * @param phone Строка с номером телефона от пользователя
 * @returns {boolean} true, если номер корректный, иначе false
 */
function validatePhoneNumber(phone: string): boolean {
  // 1. Удаляем все символы, кроме цифр
  const cleaned = phone.replace(/\D/g, '');

  // 2. Проверяем, что получилось ровно 11 цифр
  return cleaned.length === 11;
}

// --- ПРИМЕР ИСПОЛЬЗОВАНИЯ В ИИ-КОНСУЛЬТАНТЕ ---

function handleUserResponse(userInput: string): string {
  if (validatePhoneNumber(userInput)) {
    // Очищаем номер для сохранения в базу данных
    const formattedPhone = userInput.replace(/\D/g, '');
    
    // Здесь логика сохранения в CRM или отправки менеджеру
    return `Спасибо! Номер ${formattedPhone} принят. Наш менеджер свяжется с вами в ближайшее время.`;
  } else {
    // Если клиент ошибся
    return "Пожалуйста, введите корректный номер телефона, состоящий из 11 цифр (например, 89991234567).";
  }
}

// Тесты для проверки:
console.log(validatePhoneNumber("+7 (999) 123-45-67")); // true (11 цифр)
console.log(validatePhoneNumber("89991234567"));        // true (11 цифр)
console.log(validatePhoneNumber("9991234567"));         // false (10 цифр)
console.log(validatePhoneNumber("8-999-123-45-678"));   // false (12 цифр)
  const handleOpen = useCallback(async () => {
    setOpen(true);
    setShowBadge(false);
    if (TG_ON) {
      const ok = await tgSend(
        `<b>Новый клиент на сайте</b>\n${SITE}\n${openTime} · Сессия ${sessionId}`,
      );
      if (ok) showToastMsg('Менеджеры уведомлены');
    }
  }, [openTime, sessionId, showToastMsg]);

  const handleClose = useCallback(() => setOpen(false), []);

  const handlePhoneHint = useCallback(() => {
    setInput('+7 ');
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(3, 3);
    }, 50);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setShowQuick(false);
      setInput('');

      const hasPhone = containsPhone(text);
      if (hasPhone && !phoneReceived) {
        setPhoneReceived(true);
        setShowPhoneBar(false);
      }

      msgCountRef.current += 1;

      const userMsg: Message = { role: 'user', text: text.trim(), time: nowTime() };
      setMessages((prev) => [...prev, userMsg]);
      apiHistory.current.push({ role: 'user', content: text.trim() });
      setLoading(true);

      let reply = await callAI(apiHistory.current);

      if (!hasPhone && !phoneReceived && msgCountRef.current > 0) {
        reply = reply + getNextNudge();
      }

      apiHistory.current.push({ role: 'bot', content: reply });
      const showCta = !hasPhone && !phoneReceived;

      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: reply, time: nowTime(), showPhoneCta: showCta },
      ]);
      setLoading(false);

      if (TG_ON) {
        const ok = await tgSend(
          `<b>Сообщение</b>  ·  ${sessionId}\n─────────────────\n<b>Клиент:</b>\n${text.trim()}\n\n<b>Ответ AI:</b>\n${reply}${hasPhone ? '\n\n✓ Клиент оставил номер' : ''}`,
        );
        if (ok) showToastMsg('Сообщение передано менеджеру');
      }

      if (hasPhone && !phoneReceived) showToastMsg('Номер получен. Менеджер свяжется с вами.');
    },
    [loading, sessionId, showToastMsg, phoneReceived],
  );

  const handleEscalate = useCallback(async () => {
    if (escalated) {
      showToastMsg('Запрос уже отправлен');
      return;
    }
    setEscalated(true);
    setShowQuick(false);

    const hist = apiHistory.current
      .map((m) => (m.role === 'user' ? 'Клиент: ' : 'AI: ') + m.content)
      .join('\n');

    setMessages((prev) => [
      ...prev,
      { role: 'bot', text: 'Передаём запрос менеджеру...', time: nowTime() },
    ]);

    if (TG_ON) {
      const ok = await tgSend(
        `<b>ЗАПРОШЕН МЕНЕДЖЕР</b>\n${SITE}  ·  Сессия ${sessionId}\n${nowTime()}\n\n<b>История чата:</b>\n─────────────────\n${hist}`,
      );
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'bot',
          text: ok
            ? 'Менеджер уведомлён. Напишите ваше имя и номер телефона, менеджер вам перезвонит'
            : 'Свяжитесь с менеджером напрямую:\n+7 727 339-76-10\n+7 701 467-36-49',
          time: nowTime(),
        },
      ]);
      if (ok) showToastMsg('Запрос передан менеджеру');
    } else {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'bot',
          text: 'СНапишите ваше имя и номер телефона, менеджер вам перезвонит',
          time: nowTime(),
        },
      ]);
    }
  }, [escalated, sessionId, showToastMsg]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .cw-root { font-family: 'Inter', system-ui, sans-serif; }

        /* FAB */
        .cw-fab {
          position: fixed; bottom: 24px; right: 24px;
          width: 52px; height: 52px; border-radius: 50%; border: none;
          cursor: pointer; z-index: 9999;
          background: #0f52ba;
          box-shadow: 0 4px 20px rgba(15,82,186,.4);
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, box-shadow .2s, transform .15s;
        }
        .cw-fab:hover { background: #0d47a8; box-shadow: 0 6px 28px rgba(15,82,186,.5); transform: translateY(-1px); }
        .cw-fab:active { transform: scale(.95); }

        /* Badge */
        .cw-badge {
          position: fixed; bottom: 64px; right: 20px;
          background: #e53935; color: white;
          font-size: 10px; font-weight: 600;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          z-index: 10000;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Chat window */
        .cw-win {
          position: fixed; bottom: 88px; right: 24px;
          width: 360px;
          background: #fff; border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 8px 40px rgba(0,0,0,.12);
          display: flex; flex-direction: column;
          overflow: hidden; z-index: 9999;
          opacity: 0; transform: translateY(12px); pointer-events: none;
          transition: opacity .2s ease, transform .2s ease;
          transform-origin: bottom right;
          max-height: 580px;
        }
        .cw-win.cw-open { opacity: 1; transform: translateY(0); pointer-events: all; }

        /* Header */
        .cw-head {
          background: #0f52ba;
          padding: 14px 16px; display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        .cw-ava {
          width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
          background: rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
        }
        .cw-ava svg { display: block; }
        .cw-head-info { flex: 1; min-width: 0; }
        .cw-head-name { color: white; font-size: 13.5px; font-weight: 600; letter-spacing: -.01em; font-family: 'Inter', system-ui, sans-serif; }
        .cw-head-status { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
        .cw-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; flex-shrink: 0; }
        .cw-head-status span { font-size: 11.5px; color: rgba(255,255,255,.6); font-family: 'Inter', system-ui, sans-serif; }
        .cw-close-btn {
          width: 28px; height: 28px; border-radius: 6px;
          background: rgba(255,255,255,.1); border: none; color: rgba(255,255,255,.8);
          font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background .15s; flex-shrink: 0; line-height: 1;
        }
        .cw-close-btn:hover { background: rgba(255,255,255,.2); }

        /* Messages */
        .cw-msgs {
          flex: 1; overflow-y: auto; padding: 16px 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: #f8fafc; scroll-behavior: smooth;
        }
        .cw-msgs::-webkit-scrollbar { width: 3px; }
        .cw-msgs::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

        .cw-date-div { display: flex; align-items: center; gap: 10px; margin: 2px 0 6px; }
        .cw-date-div::before, .cw-date-div::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
        .cw-date-div span { font-size: 11px; color: #94a3b8; white-space: nowrap; font-family: 'Inter', system-ui, sans-serif; letter-spacing: .02em; text-transform: uppercase; }

        .cw-row { display: flex; align-items: flex-end; gap: 8px; animation: cw-msgin .18s ease; }
        @keyframes cw-msgin { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .cw-row.user { flex-direction: row-reverse; }

        .cw-msg-col { display: flex; flex-direction: column; gap: 4px; max-width: 78%; }
        .cw-row.user .cw-msg-col { align-items: flex-end; }

        .cw-msg-ava {
          width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: #e2e8f0;
        }
        .cw-msg-ava svg { display: block; }
        .cw-row.bot .cw-msg-ava { background: #0f52ba; }

        .cw-bubble {
          padding: 10px 13px 8px; border-radius: 12px;
          font-size: 13.5px; line-height: 1.6; word-break: break-word;
          font-family: 'Inter', system-ui, sans-serif;
          white-space: pre-wrap;
        }
        .cw-row.bot .cw-bubble {
          background: white; color: #1e293b;
          border-bottom-left-radius: 3px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 4px rgba(0,0,0,.04);
        }
        .cw-row.user .cw-bubble {
          background: #0f52ba; color: white;
          border-bottom-right-radius: 3px;
        }
        .cw-btime { display: block; font-size: 10px; margin-top: 4px; opacity: .4; text-align: right; letter-spacing: .01em; }

        /* Phone CTA under message */
        .cw-phone-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          color: #0f52ba; border: 1px solid #0f52ba; border-radius: 7px;
          padding: 7px 13px; font-size: 12.5px; font-weight: 500;
          font-family: 'Inter', system-ui, sans-serif;
          cursor: pointer; white-space: nowrap;
          transition: background .15s, color .15s;
          animation: cw-ctain .2s ease;
        }
        @keyframes cw-ctain { from { opacity: 0; } to { opacity: 1; } }
        .cw-phone-cta:hover { background: #0f52ba; color: white; }
        .cw-phone-cta-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0;
        }

        /* Typing dots */
        .cw-typing .cw-bubble { padding: 12px 14px; }
        .cw-dots { display: flex; gap: 4px; align-items: center; height: 10px; }
        .cw-dots span { width: 6px; height: 6px; border-radius: 50%; background: #94a3b8; animation: cw-d 1.2s infinite; }
        .cw-dots span:nth-child(2) { animation-delay: .15s; }
        .cw-dots span:nth-child(3) { animation-delay: .3s; }
        @keyframes cw-d { 0%,60%,100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-4px); opacity: 1; } }

        /* Quick chips */
        .cw-quick {
          padding: 8px 12px 10px; display: flex; flex-wrap: wrap; gap: 6px;
          background: #f8fafc; border-top: 1px solid #e2e8f0;
        }
        .cw-chip {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px; font-weight: 500;
          padding: 5px 12px; border-radius: 6px;
          border: 1px solid #cbd5e1; background: white; color: #334155;
          cursor: pointer; transition: all .15s; white-space: nowrap;
          letter-spacing: -.01em;
        }
        .cw-chip:hover { background: #0f52ba; color: white; border-color: #0f52ba; }
        .cw-chip.urgent { border-color: #fca5a5; color: #dc2626; }
        .cw-chip.urgent:hover { background: #dc2626; color: white; border-color: #dc2626; }

        /* Phone bar */
        .cw-phone-bar {
          background: #0a1f3d;
          padding: 11px 14px; display: flex; align-items: center; gap: 12px;
          flex-shrink: 0; border-top: 1px solid rgba(255,255,255,.06);
          cursor: pointer;
          transition: background .15s;
        }
        .cw-phone-bar:hover { background: #0d2a52; }
        .cw-phone-bar-icon {
          width: 32px; height: 32px; border-radius: 7px;
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cw-phone-bar-icon svg { display: block; }
        .cw-phone-bar-text { flex: 1; min-width: 0; }
        .cw-phone-bar-title {
          font-size: 12.5px; font-weight: 500; color: white;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .cw-phone-bar-sub {
          font-size: 11px; color: rgba(255,255,255,.4);
          font-family: 'Inter', system-ui, sans-serif; margin-top: 1px;
        }
        .cw-phone-bar-arr { color: rgba(255,255,255,.3); font-size: 18px; flex-shrink: 0; line-height: 1; }

        /* Input area */
        .cw-input-area {
          padding: 10px 12px; display: flex; gap: 8px; align-items: flex-end;
          background: white; border-top: 1px solid #e2e8f0; flex-shrink: 0;
        }
        .cw-textarea {
          flex: 1; min-width: 0; border: 1px solid #e2e8f0; border-radius: 8px;
          padding: 9px 12px;
          /* 16px минимум — предотвращает зум на iOS Safari при фокусе */
          font-size: 16px;
          font-family: 'Inter', system-ui, sans-serif;
          resize: none; outline: none; line-height: 1.45; color: #1e293b;
          max-height: 80px; background: #f8fafc;
          transition: border-color .15s, background .15s;
          /* Отключаем нативное масштабирование */
          touch-action: manipulation;
        }
        .cw-textarea:focus { border-color: #0f52ba; background: white; }
        .cw-textarea::placeholder { color: #94a3b8; }
        .cw-send {
          width: 38px; height: 38px; border-radius: 8px;
          background: #0f52ba; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          touch-action: manipulation;
          transition: background .15s, opacity .15s;
        }
        .cw-send:hover { background: #0d47a8; }
        .cw-send:active { opacity: .8; }
        .cw-send:disabled { opacity: .35; cursor: default; }

        /* Footer */
        .cw-foot {
          text-align: center; font-size: 10.5px; color: #cbd5e1;
          padding: 6px; background: white; border-top: 1px solid #f1f5f9;
          font-family: 'Inter', system-ui, sans-serif; letter-spacing: .01em;
        }

        /* Toast */
        .cw-toast {
          position: fixed; top: 20px; right: 20px;
          background: #1e293b; color: #f1f5f9; padding: 9px 14px;
          border-radius: 8px; font-size: 12.5px; z-index: 10001;
          box-shadow: 0 4px 16px rgba(0,0,0,.2);
          animation: cw-tin .2s ease;
          font-family: 'Inter', system-ui, sans-serif;
        }
        @keyframes cw-tin { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 430px) {
          .cw-win {
            width: calc(100vw - 16px);
            right: 8px;
            bottom: 82px;
            /* dvh учитывает виртуальную клавиатуру; fallback на vh */
            max-height: calc(100vh - 110px);
            max-height: calc(100dvh - 110px);
          }
          .cw-send {
            /* Зафиксированный размер — кнопка не сжимается */
            flex-shrink: 0;
            width: 40px; height: 40px;
          }
          .cw-textarea { font-size: 16px; }
        }
      `}</style>

      <div className="cw-root">
        {showBadge && !open && <div className="cw-badge">1</div>}

        <button className="cw-fab" onClick={open ? handleClose : handleOpen} aria-label="Чат">
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          )}
        </button>

        <div className={`cw-win${open ? ' cw-open' : ''}`}>
          <div className="cw-head">
            <div className="cw-ava">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <div className="cw-head-info">
              <div className="cw-head-name">Аида — Консультант</div>
              <div className="cw-head-status">
                <span className="cw-dot" />
                <span>Онлайн</span>
              </div>
            </div>
            <button className="cw-close-btn" onClick={handleClose} aria-label="Закрыть">
              ✕
            </button>
          </div>

          <div className="cw-msgs" ref={msgsRef}>
            <div className="cw-date-div">
              <span>Сегодня</span>
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`cw-row ${msg.role}`}>
                <div className="cw-msg-ava">
                  {msg.role === 'bot' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#64748b">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  )}
                </div>
                <div className="cw-msg-col">
                  <div className="cw-bubble">
                    {msg.text}
                    <span className="cw-btime">{msg.time}</span>
                  </div>
                  {msg.role === 'bot' && msg.showPhoneCta && !phoneReceived && (
                    <button className="cw-phone-cta" onClick={handlePhoneHint}>
                      <span className="cw-phone-cta-dot" />
                      Оставить номер телефона
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="cw-row bot cw-typing">
                <div className="cw-msg-ava">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <div className="cw-bubble">
                  <div className="cw-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
          </div>

          {showQuick && (
            <div className="cw-quick">
              {QUICK_CHIPS.map((chip) => (
                <button key={chip.text} className="cw-chip" onClick={() => sendMessage(chip.text)}>
                  {chip.label}
                </button>
              ))}
              <button className="cw-chip urgent" onClick={handleEscalate}>
                Связаться с менеджером
              </button>
            </div>
          )}

          {showPhoneBar && !phoneReceived && (
            <div
              className="cw-phone-bar"
              onClick={handlePhoneHint}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePhoneHint()}>
              <div className="cw-phone-bar-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
              </div>
              <div className="cw-phone-bar-text">
                <div className="cw-phone-bar-title">Оставьте номер — перезвоним</div>
                <div className="cw-phone-bar-sub">Менеджер свяжется в течение 5 минут</div>
              </div>
              <div className="cw-phone-bar-arr">›</div>
            </div>
          )}

          <div className="cw-input-area">
            <textarea
              ref={inputRef}
              className="cw-textarea"
              placeholder={!phoneReceived ? 'Вопрос или номер телефона...' : 'Напишите вопрос...'}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 84) + 'px';
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              className="cw-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              aria-label="Отправить">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          <div className="cw-foot">eltexalatau.kz · Powered by GPT-4o</div>
        </div>

        {toast && <div className="cw-toast">{toast}</div>}
      </div>
    </>
  );
}
