<script>
  export let state = "login";
  import { login, signup } from "../../lib/api/auth";

  let user = {
    email: "",
    password: "",
    password2: "",
  };

  let btnLabel = state === "login" ? "Login" : "Sign Up";
  let submitting = false;
  let error = {};
  let info = {};

  async function submit() {
    submitting = true;
    error = info = {};
    let res;
    if (state === "login") {
      res = await login(user);
    } else {
      user.password1 = user.password;
      res = await signup(user);
    }
    if (res.msg) {
      error = res;
    } else if (!res.detail && state === "signup") {
      // Show first error
      error = { msg: res[Object.keys(res)[0]][0] };
    } else if (res.detail) {
      info = res;
    } else {
      // Redirect to home/profile page maybe
      window.location = "/profile-settings";
    }
    submitting = false;
  }

  function downLogin(e) {
    if (e.keyCode === 13) {
      submit();
    }
  }
</script>

<div
  class="login-form"
  style="display: flex;
  flex-direction: column;"
  h
>
  <input
    class="input"
    bind:value={user.email}
    type="email"
    placeholder="Email address"
  />
  <input
    class="input"
    bind:value={user.password}
    type="password"
    placeholder="Password"
    on:keydown={downLogin}
  />
  {#if state === "signup"}
    <input
      class="input"
      bind:value={user.password2}
      type="password"
      placeholder="Repeat Password"
      on:keydown={downLogin}
      style=""
    />
  {/if}
  {#if error.msg}
    <div class="error">{error.msg}</div>
  {/if}
  {#if info.detail}
    <div class="info">{info.detail}</div>
  {/if}
  <button class="btn" class:submitting on:click={submit}
    >{submitting ? "Signing..." : btnLabel}</button
  >
</div>

<div class="social-login">
  <a
    href="https://app.realtorstat.com/api/social-login/facebook/"
   >Continue With Facebook</a
  >
  <br />
  <a
    href="https://app.realtorstat.com/api/social-login/google/"
   >Continue With Google</a
  >
</div>

<style src="./login-form.scss"></style>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">