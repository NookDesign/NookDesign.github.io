/* =========================================================
   ▼設定箇所：お問い合わせ先
   決まったら "" の中に書きこんでください。空欄のままの項目は
   ページ上で「準備中」と表示され、リンクにはなりません。
   ========================================================= */
const CONTACT = {
  // クラウドワークスのプロフィールページのURL（例："https://crowdworks.jp/public/employees/0000000"）
  crowdworks: "https://crowdworks.jp/public/employees/7281456?ref=share_url_wkprofile",
  // お問い合わせ用のメールアドレス（例："info@example.com"）
  email: "nook.design.work@gmail.com"
};

/* ===== お問い合わせ先をボタンにする ===== */
function setupContact() {
  const items = {
    crowdworks: CONTACT.crowdworks && {
      href: CONTACT.crowdworks,
      label: "クラウドワークスで相談する",
      external: true
    },
    email: CONTACT.email && {
      href: "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("【Nook Design】ホームページ制作のご相談"),
      label: "メールで相談する",
      external: false,
      // アドレスはボタンの下に文字でも表示（コピー用）
      note: CONTACT.email
    }
  };

  Object.keys(items).forEach(function (key) {
    const item = items[key];
    const box = document.querySelector('[data-contact="' + key + '"] .contact-method__action');
    if (!item || !box) return;

    const link = document.createElement("a");
    link.className = "btn btn--primary";
    link.href = item.href;
    link.textContent = item.label;
    if (item.external) {
      link.target = "_blank";
      link.rel = "noopener";
      const hint = document.createElement("span");
      hint.className = "visually-hidden";
      hint.textContent = "（新しいタブで開きます）";
      link.appendChild(hint);
    }
    box.replaceChildren(link);
    if (item.note) {
      const note = document.createElement("p");
      note.className = "contact-method__address";
      note.textContent = item.note;
      box.after(note);
    }
  });
}

/* ===== スマートフォンのメニュー開閉 ===== */
function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("global-nav");
  const label = toggle.querySelector(".nav-toggle__label");
  const pcQuery = window.matchMedia("(min-width: 960px)");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "閉じる" : "メニュー";
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("is-nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // メニュー内のリンクを押したら閉じる
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  // Esc キーで閉じる
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // 開いたまま画面が広がったら閉じる（スクロールできなくなるのを防ぐ）
  pcQuery.addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });
}

setupContact();
setupNav();
