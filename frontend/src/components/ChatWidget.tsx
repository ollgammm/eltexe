'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Inter } from 'next/font/google';
import styles from './ChatWidget.module.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--cw-font',
  display: 'swap',
});

const TG_TOKEN: string = '8507762662:AAHJ2fdVvTXZrOlhYkiujA54pnoK3Ho0AYs';
const TG_CHAT_ID: string = '-5175306815';
const SITE: string = 'eltexalatau.kz';
const TG_ON: boolean = TG_TOKEN !== '';

const PHONE_NUDGES = [
  '\n\nОставьте номер телефона — менеджер перезвонит в ближайшее время.',
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
// отправляем в телеграм канал

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
    return 'Для получения коммерческого предложения напишите вашеимя и номер мобильного телефона ';
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
    return 'Отдел продаж: напишите ваше имя и номер телефона, менеджер свяжется с Вами в ближайшее время';
  if (/привет|здравствуй|сәлем|hello/.test(t))
    return 'Здравствуйте. Я AI-консультант Аида. Отвечу на вопросы по сетевому оборудованию Eltex. Чем могу помочь?';
  if (/спасибо|рахмет|thanks/.test(t)) return 'Пожалуйста. Если возникнут вопросы — пишите.';
  return 'Для подбора оборудования под ваше техническое задание напишите ваше имя и номер телефона ';
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
  { label: 'VoIP', text: 'Нужен VoIP' }
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
    return "Пожалуйста, введите корректный номер телефона, состоящий из 11 цифр (например, +7 701 777 77 77).";
  }
}

// Тесты для проверки:
console.log(validatePhoneNumber("+7 9991234567")); // true (11 цифр)
console.log(validatePhoneNumber("+7 999 123 45 67"));        // true (11 цифр)
console.log(validatePhoneNumber("+7 999 999 99 9"));         // false (10 цифр)
console.log(validatePhoneNumber("+7 999 999 99 999"));   // false (12 цифр)
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
          text: 'Оставьте номер телефона — менеджер перезвонит в ближайшее время.',
          time: nowTime(),
        },
      ]);
      if (ok) showToastMsg('Запрос передан менеджеру');
    } else {
      setMessages((prev) => [
        ...prev.slice(0, -1),
         {
          role: 'bot',
          text: 'Оставьте номер телефона — менеджер перезвонит в ближайшее время.',
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
    <div className={`${styles.cwRoot} ${inter.variable}`}>
      {showBadge && !open && <div className={styles.cwBadge}>1</div>}

      <button className={styles.cwFab} onClick={open ? handleClose : handleOpen} aria-label="Чат">
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

      <div className={`${styles.cwWin}${open ? ` ${styles.cwOpen}` : ''}`}>
        <div className={styles.cwHead}>
          <div className={styles.cwAva}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <div className={styles.cwHeadInfo}>
            <div className={styles.cwHeadName}>Аида — Консультант</div>
            <div className={styles.cwHeadStatus}>
              <span className={styles.cwDot} />
              <span>Онлайн</span>
            </div>
          </div>
          <button className={styles.cwCloseBtn} onClick={handleClose} aria-label="Закрыть">
            ✕
          </button>
        </div>

        <div className={styles.cwMsgs} ref={msgsRef}>
          <div className={styles.cwDateDiv}>
            <span>Сегодня</span>
          </div>

          {messages.map((msg, i) => (
            <div key={i} className={`${styles.cwRow} ${styles[msg.role]}`}>
              <div className={styles.cwMsgAva}>
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
              <div className={styles.cwMsgCol}>
                <div className={styles.cwBubble}>
                  {msg.text}
                  <span className={styles.cwBtime}>{msg.time}</span>
                </div>
                {msg.role === 'bot' && msg.showPhoneCta && !phoneReceived && (
                  <button className={styles.cwPhoneCta} onClick={handlePhoneHint}>
                    <span className={styles.cwPhoneCtaDot} />
                    Оставить номер телефона
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.cwRow} ${styles.bot} ${styles.cwTyping}`}>
              <div className={styles.cwMsgAva}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div className={styles.cwBubble}>
                <div className={styles.cwDots}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
        </div>

        {showQuick && (
          <div className={styles.cwQuick}>
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.text}
                className={styles.cwChip}
                onClick={() => sendMessage(chip.text)}>
                {chip.label}
              </button>
            ))}
            <button className={`${styles.cwChip} ${styles.urgent}`} onClick={handleEscalate}>
              Связаться с менеджером
            </button>
          </div>
        )}

        {showPhoneBar && !phoneReceived && (
          <div
            className={styles.cwPhoneBar}
            onClick={handlePhoneHint}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handlePhoneHint()}>
            <div className={styles.cwPhoneBarIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
            </div>
            <div className={styles.cwPhoneBarText}>
              <div className={styles.cwPhoneBarTitle}>Оставьте номер телефона</div>
              <div className={styles.cwPhoneBarSub}>Менеджер свяжется в ближайшее время.</div>
            </div>
            <div className={styles.cwPhoneBarArr}>›</div>
          </div>
        )}

        <div className={styles.cwInputArea}>
          <textarea
            ref={inputRef}
            className={styles.cwTextarea}
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
            className={styles.cwSend}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Отправить">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        <div className={styles.cwFoot}>eltexalatau.kz · Powered by GPT-4o</div>
      </div>

      {toast && <div className={styles.cwToast}>{toast}</div>}
    </div>
  );
}
