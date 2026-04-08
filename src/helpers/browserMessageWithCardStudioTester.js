export function listenToCardStudioTester(navigate) {
  const handleMessageFromTestApp = (event) => {
    // Sécurité origine
    if (event.origin !== import.meta.env.VITE_CARD_STUDIO_TEST_URL_BASE) return;

    if (event.data === "UNAUTHORIZED") {
      console.log("Le testeur signale un token invalide. Redirection...");

      // On nettoie le localStorage de Studio si nécessaire
      localStorage.removeItem("votre_cle_token");

       navigate("/login");
    }
  };

  window.addEventListener("message", handleMessageFromTestApp);
}

export function sendMessageToCardStudioTester(data) {
  // ================= CALL TEST APP =================

  // 1- call test app
  let testApp = window.open(
    import.meta.env.VITE_CARD_STUDIO_TEST_URL_BASE,
    "_blank",
  );

  // 3- send token and game id to test app when test app is ready to receive it
  const handleReady = (event) => {
    if (event.origin !== import.meta.env.VITE_CARD_STUDIO_TEST_URL_BASE) return;
    // send main information when test app is ready
    if (event.data === "READY_FOR_TOKEN") {
      testApp.postMessage(data, import.meta.env.VITE_CARD_STUDIO_TEST_URL_BASE);
      console.log(
        "send message to " + import.meta.env.VITE_CARD_STUDIO_TEST_URL_BASE,
      );
      window.removeEventListener("message", handleReady);
    }
  };

  // 2- wait for test app response
  window.addEventListener("message", handleReady);

  // if card studio tester want to communicate
  // listerner is called globally in GameCreationEnvironnement
}
