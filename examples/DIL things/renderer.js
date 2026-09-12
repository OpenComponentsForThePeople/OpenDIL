async function loadDIL() {
    const response = await fetch("DIL.json");
    const dil = await response.json();

    for (const [name, component] of Object.entries(dil.components)) {
        const elements = document.querySelectorAll(component.element);

        elements.forEach(element => {
            element.dataset.dilComponent = name;
        });

        if (component.stylesheet) {
            const existing = document.querySelector(
                `link[href="${component.stylesheet}"]`
            );

            if (!existing) {
                const stylesheet = document.createElement("link");
                stylesheet.rel = "stylesheet";
                stylesheet.href = component.stylesheet;
                document.head.appendChild(stylesheet);
            }
        }
    }

    renderBoxes();
    renderRankingBoards();
    renderIcons();
    renderBadges();
}


function renderBoxes() {
    document.querySelectorAll("box").forEach(box => {
        const color = box.getAttribute("color");
        const bgColor = box.getAttribute("bg-color");
        const border = box.getAttribute("border");

        if (color) {
            box.style.color = color;
        }

        if (bgColor) {
            box.style.backgroundColor = bgColor;

            box.style.setProperty(
                "--smoothing-background-color",
                bgColor
            );
        }

        if (border) {
            box.style.borderColor = border;
        }
    });
}

function renderIcons() {
    document.querySelectorAll("icon").forEach(icon => {
        const name = icon.textContent.trim();

        const materialIcon = document.createElement("span");
        materialIcon.className = "material-symbols-outlined";
        materialIcon.textContent = name;

        icon.replaceWith(materialIcon);
    });
}

function renderRankingBoards() {
    document.querySelectorAll("ranking-board").forEach(board => {
        const title = board.getAttribute("title") || "";
        const description = board.getAttribute("description") || "";
        const rankCount = parseInt(board.getAttribute("ranks")) || 0;

        const ranks = Array.from(board.querySelectorAll(":scope > rank"));

        // Keep the original rank elements aside
        ranks.forEach(rank => rank.remove());

        const header = document.createElement("div");
        header.className = "ranking-header";

        const titleElement = document.createElement("strong");
        titleElement.textContent = title;

        header.appendChild(titleElement);

        if (description) {
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = description;
            header.appendChild(descriptionElement);
        }

        board.appendChild(header);

        const list = document.createElement("div");
        list.className = "ranking-list";

        const visibleRanks = rankCount > 0
            ? ranks.slice(0, rankCount)
            : ranks;

        visibleRanks.forEach(rank => {
            const row = document.createElement("div");
            row.className = "rank-row";

            const rankee = document.createElement("div");
            rankee.className = "rankee";
            rankee.textContent = rank.getAttribute("rankee") || "";

            const content = document.createElement("div");
            content.className = "rank-content";

            const name = document.createElement("strong");
            name.textContent = rank.getAttribute("name") || "";

            const label = document.createElement("span");
            label.textContent = rank.getAttribute("label") || "";

            const rankDescription = document.createElement("p");
            rankDescription.textContent =
                rank.getAttribute("description") || "";

            content.appendChild(name);
            content.appendChild(label);
            content.appendChild(rankDescription);

            const score = document.createElement("strong");
            score.className = "rank-score";
            score.textContent = rank.getAttribute("score") || "";

            row.appendChild(rankee);
            row.appendChild(content);
            row.appendChild(score);

            list.appendChild(row);
        });

        board.appendChild(list);
    });
}

function renderBadges() {
    document.querySelectorAll("badge").forEach(badge => {
        const color = badge.getAttribute("color");
        const bgColor = badge.getAttribute("bg-color");

        if (color) {
            badge.style.color = color;
        }

        if (bgColor) {
            badge.style.backgroundColor = bgColor;
        }
    });
}

loadDIL();