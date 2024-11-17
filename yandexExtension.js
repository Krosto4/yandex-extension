(function (Scratch) {
    'use strict';

    // Подключение Yandex SDK
    const sdkUrl = "https://raw.githubusercontent.com/Krosto4/yandexSDK/refs/heads/main/yandexSDK.js";

    // Асинхронная загрузка Yandex SDK
    const loadSdk = async () => {
        if (!window.YaGames) {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = sdkUrl;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
        return YaGames.init();
    };

    let yaGamesInstance;

    // Регистрация расширения
    Scratch.extensions.register('YandexSDK', {
        blocks: [
            {
                opcode: 'initSDK',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Инициализировать Yandex SDK',
            },
            {
                opcode: 'showAd',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Показать рекламу',
            },
            {
                opcode: 'logMessage',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Вывести [MESSAGE]',
                arguments: {
                    MESSAGE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'Привет, Yandex!',
                    },
                },
            },
        ],

        menus: {},

        initSDK: async () => {
            try {
                yaGamesInstance = await loadSdk();
                console.log("Yandex SDK initialized successfully!");
            } catch (error) {
                console.error("Failed to initialize Yandex SDK:", error);
            }
        },

        showAd: () => {
            if (!yaGamesInstance) {
                console.warn("SDK is not initialized!");
                return;
            }
            yaGamesInstance.adv.showFullscreenAdv({
                callbacks: {
                    onClose: () => console.log("Ad closed"),
                    onError: (err) => console.error("Ad error", err),
                },
            });
        },

        logMessage: ({ MESSAGE }) => {
            console.log(MESSAGE);
        },
    });
})(Scratch);
