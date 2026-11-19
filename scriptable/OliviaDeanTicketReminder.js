// Scriptable: Olivia Dean (Japan) general-sale reminder
// Run once in Scriptable. Adds an iOS Reminder + local notifications
// for the general sale: 19 Dec 2026 10:00 JST = 08:00 Bangkok time.

const SALE = new Date("2026-12-19T08:00:00+07:00");
const URL = "https://www.creativeman.co.jp/artist/2027/oliviadean27/";
const TITLE = "🎫 กดบัตร Olivia Dean ญี่ปุ่น";
const BODY =
  "ขายทั่วไป 08:00 เวลาไทย (10:00 JST)\n" +
  "11 ก.พ. 2027 @ K-Arena Yokohama\n" +
  "SS/Balcony ¥26,800 | S ¥19,800 | A ¥14,800";

// 1) iOS Reminders app
const r = new Reminder();
r.title = TITLE;
r.notes = BODY + "\n" + URL;
r.dueDate = SALE;
r.dueDateIncludesTime = true;
r.addAlarm(Alarm.absolute(new Date(SALE.getTime() - 24 * 60 * 60 * 1000)));
r.addAlarm(Alarm.absolute(new Date(SALE.getTime() - 10 * 60 * 1000)));
r.addAlarm(Alarm.absolute(SALE));
r.save();

// 2) Local notifications from Scriptable (tap opens the ticket page)
const alerts = [
  { mins: 24 * 60, text: "พรุ่งนี้ 08:00 เปิดขายบัตร Olivia Dean ญี่ปุ่น" },
  { mins: 60, text: "อีก 1 ชม. เปิดขาย — ล็อกอินเว็บ เตรียมบัตรเครดิต" },
  { mins: 10, text: "อีก 10 นาที! เปิดหน้าเว็บรอเลย" },
  { mins: 0, text: "เปิดขายแล้ว! กดเลย 🏃" },
];
for (const a of alerts) {
  const when = new Date(SALE.getTime() - a.mins * 60 * 1000);
  if (when <= new Date()) continue;
  const n = new Notification();
  n.identifier = "olivia-dean-jp-" + a.mins;
  n.title = TITLE;
  n.body = a.text;
  n.openURL = URL;
  n.sound = "alert";
  n.setTriggerDate(when);
  await n.schedule();
}

const done = new Alert();
done.title = "ตั้งเตือนแล้ว ✅";
done.message = "Reminders + แจ้งเตือน 4 ครั้ง\n19 ธ.ค. 2026 08:00 (เวลาไทย)";
done.addAction("OK");
await done.present();
Script.complete();
