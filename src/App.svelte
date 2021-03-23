<script>
  import { onMount } from "svelte";
  import page from "page";
  import {
    Home,
    Profile,
    Login,
    VerifyEmail,
    ProfileSettings,
    ConnectProfile,
    Inbox,
    Reports,
    Marketing
  } from "./pages";
  import { Notification, Modal } from "./components";
  import { notif } from "./stores/notif";

  import { isAuthenticated, currentUser } from "./lib/api/auth";

  page.start();
  page("*", (c, next) => {
    scrollTo(0, 0);
    next();
  });

  let active = Home;
  let props = {};

  page("/", ctx => {
    active = Home;
    props = {};
  });
  page("/login", ctx => {
    if (isAuthenticated()) {
      page.redirect("/");
      return;
    }
    active = Login;
  });
  page("/profile/:name", ctx => {
    active = Profile;
    props = ctx.params;
  });
  page("/profile/:name/:custom", ctx => {
    active = Profile;
    props = ctx.params;
  });

  page("/verify-email/:key", ctx => {
    active = VerifyEmail;
    props = ctx.params;
  });

  // Dashboard
  page("/profile-settings", ctx => {
    if (!isAuthenticated()) {
      page.redirect("/login");
      return;
    }
    if (!currentUser().agent_id) {
      page.redirect("/connect-profile");
      return;
    }
    active = ProfileSettings;
    props = {};
  });

  page("/connect-profile", ctx => {
    if (!isAuthenticated()) {
      page.redirect("/login");
      return;
    }
    if (currentUser().agent_id) {
      page.redirect("/profile-settings");
      return;
    }
    active = ConnectProfile;
    props = {};
  });

  page("/inbox", ctx => {
    if (!isAuthenticated()) {
      page.redirect("/login");
      return;
    }
    if (!currentUser().agent_id) {
      page.redirect("/connect-profile");
      return;
    }
    active = Inbox;
    props = {};
  });

  page("/reports", ctx => {
    if (!isAuthenticated()) {
      page.redirect("/login");
      return;
    }
    if (!currentUser().agent_id) {
      page.redirect("/connect-profile");
      return;
    }
    active = Reports;
    props = {};
  });
  
  page("/marketing", ctx => {
    if (!isAuthenticated()) {
      page.redirect("/login");
      return;
    }
    if (!currentUser().agent_id) {
      page.redirect("/connect-profile");
      return;
    }
    active = Marketing;
    props = {};
  });

  page("*", () => page.redirect("/"));

  onMount(() => {
    if (location.pathname != "/") page.replace(location.pathname);
  });
</script>

<Notification show={$notif.show} msg={$notif.msg} error={$notif.error} />
<Modal />
<main>
  <svelte:component this={active} {...props} />
</main>
