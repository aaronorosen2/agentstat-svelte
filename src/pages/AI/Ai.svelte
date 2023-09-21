<script>
  import { isAuthenticated } from "../../lib/api/auth";
  import { onMount } from "svelte";
  let currentPage;

  let is_authenticated = isAuthenticated();

  let open = false;

  function close() {
    open = false;
  }

  onMount(() => {
    currentPage = location.pathname;
  });
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
    rel="stylesheet"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <!-- <link rel="stylesheet" href="./style.css"> -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<div class="popup">
  <div class="mobilcat">
    <div class="line">
      <h1>Categories</h1>
      <i class="ri-close-fill" />
    </div>
    <div class="links">
      <button>
        <i class="ri-asterisk" /> All
      </button>
      <button>
        <i class="ri-image-fill" /> Photo
      </button>
      <button>
        <i class="ri-grid-fill" /> Website
      </button>
      <button>
        <i class="ri-mail-add-line" /> Email
      </button>
      <button>
        <i class="ri-file-chart-line" /> Scripts
      </button>
      <button>
        <i class="ri-heart-line" /> Social Media
      </button>
      <button>
        <i class="ri-chat-1-line" /> SMS
      </button>
    </div>
  </div>
</div>
<div class="popup2">
  <div class="mobilcat">
    <div class="line">
      <h1>Filter</h1>
      <i class="ri-close-fill" />
    </div>
    <div class="links">
      <button> <i class="ri-asterisk" /> All </button>
      <button>
        <i class="ri-group-line" /> Buyers
      </button>
      <button>
        <i class="ri-home-heart-line" /> Sellers
      </button>
    </div>
  </div>
</div>
<svelte:window on:click={close} />
{#if !is_authenticated}
  <div class="main">
    <div class="nav">
      {#if currentPage != "/"}
        <a href="/">
          <img src="/images/logo-beta.png" alt="" />
        </a>
      {/if}
      <input type="text" placeholder="Search" />
    </div>
    <div class="input-media">
      <input type="text" placeholder="Search" />
      <div class="topbtns">
        <div class="f"><button>Filters</button></div>
        <div class="c"><button>Categories</button></div>
      </div>
    </div>

    <div class="contain">
      <div class="left">
        <div class="container">
          <h1>Categories</h1>
          <div class="btn">
            <button>
              <i class="ri-asterisk" /> All
            </button>
            <button>
              <i class="ri-image-fill" /> Photo
            </button>
            <button>
              <i class="ri-grid-fill" /> Website
            </button>
            <button>
              <i class="ri-mail-add-line" /> Email
            </button>
            <button>
              <i class="ri-file-chart-line" /> Scripts
            </button>
            <button>
              <i class="ri-heart-line" /> Social Media
            </button>
            <button>
              <i class="ri-chat-1-line" /> SMS
            </button>
          </div>
          <h1>Filter</h1>
          <div class="btn">
            <button>
              <i class="ri-asterisk" /> All
            </button>
            <button>
              <i class="ri-group-line" /> Buyers
            </button>
            <button>
              <i class="ri-home-heart-line" /> Sellers
            </button>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="cards">
          {#if currentPage != "/Website"}
            <a href="/Website">
              <div class="card webiste" id="website">
                <h1>WEBSITE</h1>
                <h2>Listing Discription Generator</h2>
                <p>
                  Create engaging property descriptions highlighting key
                  features.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Email"}
            <a href="/Email">
              <div class="card email" id="email">
                <h1>EMAIL</h1>
                <h2>Freeform Email Generator</h2>
                <p>Create professional emails tailored to your needs.</p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Website"}
            <a href="/Website">
              <div class="card website" id="website">
                <h1>WEBSITE</h1>
                <h2>Blog Post Creator</h2>
                <p>Create unique and engaging blog posts for your website.</p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Script"}
            <a href="/Script">
              <div class="card script" id="script">
                <h1>Script</h1>
                <h2>General Script</h2>
                <p>
                  Generate talking points and scripts for planned calls or
                  meetings.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/SocialFacebook"}
            <a href="/SocialFacebook">
              <div class="card social" id="social">
                <h1>Social Media</h1>
                <h2>Facebook Post</h2>
                <p>Create captivating Facebook post.</p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/SocialInstagram"}
            <a href="/SocialInstagram">
              <div class="card social" id="social">
                <h1>Social Media</h1>
                <h2>Instagram Post</h2>
                <p>Create engaging Instagram posts.</p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/SocialLinkdin"}
            <a href="/SocialLinkdin">
              <div class="card social" id="social">
                <h1>Social Media</h1>
                <h2>LinkdIn Post</h2>
                <p>Create professional LinkdIn posts.</p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Photo"}
            <a href="/Photo">
              <div class="card photo" id="photo">
                <h1>Photo</h1>
                <h2>Photos from AI</h2>
                <p>Create engaging photo from AI.</p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/SMS"}
            <a href="/SMS">
              <div class="card sms" id="sms">
                <h1>SMS</h1>
                <h2>SMS Helper</h2>
                <p>
                  Drafts a text message that you can send to a client or
                  prospect.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Email"}
            <a href="/Email">
              <div class="card email" id="email">
                <h1>EMAIL</h1>
                <h2>Seller Congratulations</h2>
                <p>
                  Creates an email for prospects and clients, inviting them to
                  follow you on various social media channels in order to
                  continue to nurture the relationship.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Email"}
            <a href="/Email">
              <div class="card email" id="email">
                <h1>EMAIL</h1>
                <h2>Social Media Invite</h2>
                <p>
                  Create engaging property descriptions highlighting key
                  features.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Website"}
            <a href="/Website">
              <div class="card website" id="website">
                <h1>WEBSITE</h1>
                <h2>Post-Viewing Feedback Request</h2>
                <p>
                  Draft emails to gather feedback and gauge interest from
                  potential buyers.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Website"}
            <a href="Website">
              <div class="card website" id="website">
                <h1>WEBSITE</h1>
                <h2>Listing Discription Generator</h2>
                <p>
                  Create engaging property descriptions highlighting key
                  features.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Email"}
            <a href="/Email">
              <div class="card email" id="email">
                <h1>email</h1>
                <h2>Revive Buyer Interest</h2>
                <p>
                  Create persuasive emails to re-engage inactive buyer leads who
                  stopped returning your phone calls or responding to emails.
                </p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Email"}
            <a href="/Email">
              <div class="card email" id="email">
                <h1>email</h1>
                <h2>Post-Viewing Feedback Request</h2>
                <p>Create professional emails tailored to your needs.</p>
              </div>
            </a>
          {/if}

          {#if currentPage != "/Social"}
            <a href="/Social">
              <div class="card social" id="social">
                <h1>Social media</h1>
                <h2>Twitter Post</h2>
                <p>Create compelling Twitter posts.</p>
              </div>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
<footer>Copyright&copyAgenstatBeta.com</footer>

<style src="./Ai.scss"></style>
