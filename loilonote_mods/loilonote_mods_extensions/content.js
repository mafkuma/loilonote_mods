let panelVisible = false;
let panelElement = null;

// === 拡張機能からのメッセージ受信 ===
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.toggleUI) toggleUI();
});

// === トグル関数 ===
function toggleUI() {
    if (!panelVisible) {
        createPanel();
        panelVisible = true;
    } else {
        if (panelElement) panelElement.remove();
        panelVisible = false;
    }
}

function createPanel() {
    const panel = document.createElement("div");
    panelElement = panel;

    panel.style.position = "fixed";
    panel.style.bottom = "20px";
    panel.style.right = "20px";
    panel.style.padding = "15px";
    panel.style.background = "rgba(0,0,0,0.6)";
    panel.style.color = "white";
    panel.style.borderRadius = "10px";
    panel.style.zIndex = "99999";
    panel.style.width = "260px";
    panel.style.fontSize = "14px";
    panel.style.backdropFilter = "blur(4px)";
    panel.style.userSelect = "none";

    // === TeacherTool ===
    function spawnTeacherTool() {
        const main_body = document.getElementById("main");
        if (!main_body) return;

        if (document.querySelector(".teacherTool")) return;

        const teacherTool = document.createElement("div");
        teacherTool.className = "teacherTool";
        teacherTool.setAttribute("data-visible","true");

        const teacherToolContainer = document.createElement("div");
        teacherToolContainer.className = "teacherToolContainer";

        const teacherToolHandleWrapper = document.createElement("div");
        teacherToolHandleWrapper.className = "teacherToolHandleWrapper";

        const teacherToolBorder1 = document.createElement("div");
        teacherToolBorder1.className = "teacherToolBorder";

        const teacherToolBorder2 = document.createElement("div");
        teacherToolBorder2.className = "teacherToolBorder";

        const internalButton_teacherToolHandle = document.createElement("div");
        internalButton_teacherToolHandle.className = "internalButton teacherToolHandle";
        internalButton_teacherToolHandle.setAttribute("role","button");

        internalButton_teacherToolHandle.onclick = () => {
            if (teacherTool.classList.contains("teacherTool-enter-done")) {
                teacherTool.classList.remove("teacherTool-enter-done");
                teacherTool.classList.add("teacherTool-exit-done");
            } else {
                teacherTool.classList.remove("teacherTool-exit-done");
                teacherTool.classList.add("teacherTool-enter-done");
            }
        };

        const teacherToolInner = document.createElement("div");
        teacherToolInner.className = "teacherToolInner";

        // ボタン1：生徒間通信
        const teacherToolButtonWrapper1 = document.createElement("div");
        teacherToolButtonWrapper1.className = "teacherToolButtonWrapper";

        const btnTunnel = document.createElement("div");
        btnTunnel.className = "internalButton teacherToolButton teacherToolTunnelButton firstTeacherToolButton";
        btnTunnel.setAttribute("role","button");
        btnTunnel.setAttribute("data-locked","false");

        const teacherToolButtonDesc1 = document.createElement("div");
        teacherToolButtonDesc1.className = "teacherToolButtonDesc";
        teacherToolButtonDesc1.textContent = "生徒間通信";

        teacherToolButtonWrapper1.appendChild(btnTunnel);
        teacherToolButtonWrapper1.appendChild(teacherToolButtonDesc1);

        // ボタン2：画面ロック
        const teacherToolButtonWrapper2 = document.createElement("div");
        teacherToolButtonWrapper2.className = "teacherToolButtonWrapper";

        const btnLock = document.createElement("div");
        btnLock.className = "internalButton teacherToolButton teacherToolLockScreenButton";
        btnLock.setAttribute("role","button");
        btnLock.setAttribute("data-locked","false");

        const teacherToolButtonDesc2 = document.createElement("div");
        teacherToolButtonDesc2.className = "teacherToolButtonDesc";
        teacherToolButtonDesc2.textContent = "画面ロック";

        teacherToolButtonWrapper2.appendChild(btnLock);
        teacherToolButtonWrapper2.appendChild(teacherToolButtonDesc2);

        // ボタン3：参加者確認
        const relative = document.createElement("div");
        relative.className = "relative";

        const teacherToolButtonWrapper3 = document.createElement("div");
        teacherToolButtonWrapper3.className = "teacherToolButtonWrapper";

        const btnAttend = document.createElement("div");
        btnAttend.className = "internalButton teacherToolButton teacherToolAttendancesButton";
        btnAttend.setAttribute("role","button");
        btnAttend.setAttribute("data-locked","false");

        const teacherToolButtonDesc3 = document.createElement("div");
        teacherToolButtonDesc3.className = "teacherToolButtonDesc";
        teacherToolButtonDesc3.textContent = "参加者確認";

        teacherToolButtonWrapper3.appendChild(btnAttend);
        teacherToolButtonWrapper3.appendChild(teacherToolButtonDesc3);
        relative.appendChild(teacherToolButtonWrapper3);

        // DOM 組み立て
        main_body.appendChild(teacherTool);
        teacherTool.appendChild(teacherToolContainer);

        teacherToolContainer.appendChild(teacherToolHandleWrapper);
        teacherToolHandleWrapper.appendChild(teacherToolBorder1);
        teacherToolHandleWrapper.appendChild(internalButton_teacherToolHandle);
        teacherToolHandleWrapper.appendChild(teacherToolBorder2);

        teacherToolContainer.appendChild(teacherToolInner);
        teacherToolInner.appendChild(teacherToolButtonWrapper1);
        teacherToolInner.appendChild(teacherToolButtonWrapper2);
        teacherToolInner.appendChild(relative);
    }

    // 背景色入力
    const bgLabel = document.createElement("div");
    bgLabel.textContent = "背景色（CSS）";
    bgLabel.style.marginTop = "5px";

    const bgInput = document.createElement("input");
    bgInput.type = "text";
    bgInput.value = "linear-gradient(90deg, rgba(105,234,203,1), rgba(215,98,252,1) 67%, rgba(102,84,241,1))";
    bgInput.style.width = "100%";
    bgInput.style.marginTop = "3px";

    // 名前入力
    const nameLabel = document.createElement("div");
    nameLabel.textContent = "名前";
    nameLabel.style.marginTop = "10px";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = "ユーザー名";
    nameInput.style.width = "100%";
    nameInput.style.marginTop = "3px";

    // 名前色入力
    const nameColorLabel = document.createElement("div");
    nameColorLabel.textContent = "名前の色（CSS）";
    nameColorLabel.style.marginTop = "10px";

    const nameColorInput = document.createElement("input");
    nameColorInput.type = "text";
    nameColorInput.value = "red";
    nameColorInput.style.width = "100%";
    nameColorInput.style.marginTop = "3px";

    // userProfileText 入力
    const profileLabel = document.createElement("div");
    profileLabel.textContent = "プロフィール（userProfileText）";
    profileLabel.style.marginTop = "10px";

    const profileInput = document.createElement("input");
    profileInput.type = "text";
    profileInput.value = "ノートの名前";
    profileInput.style.width = "100%";
    profileInput.style.marginTop = "3px";

    // 適用ボタン
    const applyBtn = document.createElement("button");
    applyBtn.textContent = "変更を適用";
    applyBtn.style.marginTop = "12px";
    applyBtn.style.width = "100%";
    applyBtn.style.padding = "6px";
    applyBtn.style.borderRadius = "6px";
    applyBtn.style.border = "none";
    applyBtn.style.cursor = "pointer";

    applyBtn.onclick = () => {
        const main = document.getElementById("main");
        if (main) main.style.background = bgInput.value;

        const nameElem = document.querySelector(".name");
        if (nameElem) {
            nameElem.textContent = nameInput.value;
            nameElem.style.color = nameColorInput.value;
        }

        const profileElem = document.querySelector(".userProfileText");
        if (profileElem) {
            profileElem.textContent = profileInput.value;
        }
    };

    // 先生用ツールボタン
    const teacherBtn = document.createElement("button");
    teacherBtn.textContent = "先生用ツールを表示";
    teacherBtn.style.marginTop = "10px";
    teacherBtn.style.width = "100%";
    teacherBtn.style.padding = "6px";
    teacherBtn.style.borderRadius = "6px";
    teacherBtn.style.border = "none";
    teacherBtn.style.cursor = "pointer";

    teacherBtn.onclick = () => {
        spawnTeacherTool();
    };

    // パネルに追加
    panel.appendChild(teacherBtn);
    panel.appendChild(bgLabel);
    panel.appendChild(bgInput);
    panel.appendChild(nameLabel);
    panel.appendChild(nameInput);
    panel.appendChild(nameColorLabel);
    panel.appendChild(nameColorInput);
    panel.appendChild(profileLabel);
    panel.appendChild(profileInput);
    panel.appendChild(applyBtn);

    document.body.appendChild(panel);
}
