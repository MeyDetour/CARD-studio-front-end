const targetOrigin = new URL(import.meta.env.VITE_CARD_STUDIO_TEST_URL_BASE)
  .origin;

export function listenToCardStudioTester(navigate) {
  const handleMessageFromTestApp = (event) => {
    // Sécurité origine
    if (event.origin !== targetOrigin) return;

    if (event.data === "UNAUTHORIZED") {
      console.log("Le testeur signale un token invalide. Redirection...");

      localStorage.removeItem("token");

      navigate("/login");
    }
  };

  window.addEventListener("message", handleMessageFromTestApp);
}

export function sendMessageToCardStudioTester(data) {
  const targetOrigin = new URL(import.meta.env.VITE_CARD_STUDIO_TEST_URL_BASE)
    .origin;

  // ================= CALL TEST APP =================

  // 1- call test app
  let testApp = window.open(targetOrigin, "_blank");

  // 3- send token and game id to test app when test app is ready to receive it
  const handleReady = (event) => {
    if (event.origin !== targetOrigin) return;

    // send main information when test app is ready
    if (event.data === "READY_FOR_TOKEN") {
      if (testApp && !testApp.closed) {
        testApp.postMessage(data, targetOrigin);
        console.log("Message envoyé avec succès à :", targetOrigin);
      } else {
        console.error("La fenêtre de test a été fermée ou est inaccessible.");
      }
      window.removeEventListener("message", handleReady);
    }
  };

  // 2- wait for test app response
  window.addEventListener("message", handleReady);

  // if card studio tester want to communicate
  // listener is called globally in GameCreationEnvironnement
}
