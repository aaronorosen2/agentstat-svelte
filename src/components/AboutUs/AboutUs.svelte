<script>
  let isContentAdded = false;
  let currentPageIndex = 0;
  const pages = ["Overview", "Organizing", "Search"];

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearMainBox() {
    const mainBox = document.querySelector(".main");
    while (mainBox.firstChild) {
      mainBox.removeChild(mainBox.firstChild);
    }
  }

  function createAndAppendElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    element.setAttribute("class", className);
    element.textContent = textContent;
    return element;
  }

  function createVideoContainer(videoSrc) {
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("videoContainer");

    const video = document.createElement("video");
    video.setAttribute("autoplay", true);
    video.setAttribute("muted", true);

    const source = document.createElement("source");
    source.setAttribute("src", videoSrc);
    source.setAttribute("type", "video/mp4");

    video.appendChild(source);
    videoContainer.appendChild(video);

    video.style.width = "100%";

    return videoContainer;
  }

  function OverviewPage() {
    clearMainBox();

    const mainBox = document.querySelector(".main");
    const LeftBtnTitle = document.getElementById("LeftBtnH4");
    const RightBtnTitle = document.getElementById("RightBtnH4");
    mainBox.style.display = "flex";
    mainBox.style.flexDirection = "column";
    mainBox.style.justifyContent = "center";
    mainBox.style.alignItems = "center";

    const Overview = document.querySelector("#Overview");
    const Organizing = document.querySelector("#Organizing");
    const Search = document.querySelector("#Search");

    Overview.style.borderBottom = "4px solid rgb(7, 131, 255)";
    Organizing.style.border = "none";
    Search.style.border = "none";

    LeftBtnTitle.textContent = "Search Algorithms";
    RightBtnTitle.textContent = "Organizing Transactions";
    const video1 =
      "https://realtorstat.com/howsearchwork_assets/videos/how_agentstat_works.mp4";
    const video2 =
      "https://realtorstat.com/howsearchwork_assets/videos/Organizing_real_estate_transactions.mp4";
    const video3 =
      "https://realtorstat.com/howsearchwork_assets/videos/instant_match_search.mp4";
    const video4 =
      "https://realtorstat.com/howsearchwork_assets/videos/We_Dont_sell_ads_or_search_results_V1.mp4";
    const video5 =
      "https://realtorstat.com/howsearchwork_assets/videos/Always_improving_your_experience.mp4";
    const videoContainer1 = createVideoContainer(video1);
    const videoContainer2 = createVideoContainer(video2);
    const videoContainer3 = createVideoContainer(video3);
    const videoContainer4 = createVideoContainer(video4);
    const videoContainer5 = createVideoContainer(video5);

    const heading1 = createAndAppendElement(
      "h1",
      "h1OverView h1",
      "How AgentStat search works"
    );
    const para1 = createAndAppendElement(
      "p",
      "p1OverView p",
      "Every time you search, there are hundreds, sometimes thousands, of real estate agents with varying knowledge, experience and results. How AgentStat figures out which Agents to show starts long before you even type, and is guided by a commitment to provide the best information."
    );
    heading1.style.fontSize = "45px";
    heading1.style.textAlign = "center";
    para1.style.fontSize = "20px";
    para1.style.lineHeight = "1.8";
    para1.style.textAlign = "center";
    para1.style.color = "rgb(105, 105, 105)";
    const heading2 = createAndAppendElement(
      "h1",
      "h2OverView h1",
      "Organizing real estate transactions"
    );
    const para2 = createAndAppendElement(
      "p",
      "p2OverView p",
      "Even before you search, AgentStat organizes all of the data points that are relevant to find the best agent. These include: Home type, price, days on market, success rate, list to sold price ratio, and location."
    );
    heading2.style.fontSize = "45px";
    heading2.style.textAlign = "center";
    para2.style.fontSize = "20px";
    para2.style.lineHeight = "1.8";
    para2.style.textAlign = "center";
    para2.style.color = "rgb(105, 105, 105)";
    const heading3 = createAndAppendElement(
      "h1",
      "h3OverView h1",
      "Instantly matching your search"
    );
    const para3 = createAndAppendElement(
      "p",
      "p3OverView p",
      "Within seconds, AgentStat’s search algorithms sort through billions of data points and millions of real estate agents to find the most relevant agent for what you’re looking for."
    );
    heading3.style.fontSize = "45px";
    heading3.style.textAlign = "center";
    para3.style.fontSize = "20px";
    para3.style.lineHeight = "1.8";
    para3.style.textAlign = "center";
    para3.style.color = "rgb(105, 105, 105)";
    const heading4 = createAndAppendElement(
      "h1",
      "h4OverView h1",
      "We don’t sell ads, or search results"
    );
    const para4 = createAndAppendElement(
      "p",
      "p4OverView p",
      "While other companies place agents based on the marketing spend that they pay, no one can buy better placement in our results."
    );
    heading4.style.fontSize = "45px";
    heading4.style.textAlign = "center";
    para4.style.fontSize = "20px";
    para4.style.lineHeight = "1.8";
    para4.style.textAlign = "center";
    para4.style.color = "rgb(105, 105, 105)";
    const heading5 = createAndAppendElement(
      "h1",
      "h5OverView h1",
      "Always improving your experience"
    );
    const para5 = createAndAppendElement(
      "p",
      "p5OverView p",
      "We know agent searching can always be improved. Our AgentStat engineers spend every day testing and conducting experiments, resulting in constant improvements."
    );
    heading5.style.fontSize = "45px";
    heading5.style.textAlign = "center";
    para5.style.fontSize = "20px";
    para5.style.lineHeight = "1.8";
    para5.style.textAlign = "center";
    para5.style.color = "rgb(105, 105, 105)";
    mainBox.appendChild(heading1);
    mainBox.appendChild(para1);
    mainBox.appendChild(videoContainer1);
    mainBox.appendChild(heading2);
    mainBox.appendChild(para2);
    mainBox.appendChild(videoContainer2);
    mainBox.appendChild(heading3);
    mainBox.appendChild(para3);
    mainBox.appendChild(videoContainer3);
    mainBox.appendChild(heading4);
    mainBox.appendChild(para4);
    mainBox.appendChild(videoContainer4);
    mainBox.appendChild(heading5);
    mainBox.appendChild(para5);
    mainBox.appendChild(videoContainer5);

    isContentAdded = true;
    scrollToTop();
  }

  function OrganizingPage() {
    const mainBox = document.querySelector(".main");
    mainBox.style.padding = "0 250px 0 250px";
    const container = document.createElement("div");
    const heading1 = document.createElement("h1");
    const heading2 = document.createElement("h4");
    const para1 = document.createElement("p");
    const heading3 = document.createElement("h4");
    const para2 = document.createElement("p");
    const Overview = document.querySelector("#Overview");
    const Organizing = document.querySelector("#Organizing");
    const Search = document.querySelector("#Search");
    const RightBtnTitle = document.getElementById("RightBtnH4");
    const LeftBtnTitle = document.getElementById("LeftBtnH4");
    heading1.style.fontSize = "45px";
    heading1.style.marginBottom = "55px";
    heading2.style.fontSize = "22px";
    heading3.style.fontSize = "22px";
    heading3.style.marginTop = "60px";
    para1.style.lineHeight = "1.8";
    para1.style.color = "rgb(105, 105, 105)";
    para1.style.fontSize = "18px";
    para2.style.lineHeight = "1.8";
    para2.style.color = "rgb(105, 105, 105)";
    para2.style.fontSize = "18px";

    heading1.setAttribute("class", "h1OfOrganizing");
    para1.setAttribute("class", "Para1");
    heading2.setAttribute("class", "h2OfOrganizing");
    para2.setAttribute("class", "Para2");
    heading3.setAttribute("class", "h3OfOrganizing");
    while (mainBox.firstChild) {
      mainBox.removeChild(mainBox.firstChild);
    }
    Overview.style.border = "none";
    Organizing.style.borderBottom = "4px solid rgb(7, 131, 255)";
    Search.style.border = "none";
    heading1.textContent = "How search organizes information";
    heading2.textContent = "The fundamentals of home sales data";
    para1.textContent =
      "The crawling process begins with a list of every home in America; our crawlers keep track of the sales history of each of these homes. The software pays special attention to list dates, list price, sale price, days on market, and the real estate agents involved.";
    heading3.textContent = "Organizing information by indexing";
    para2.textContent =
      "The AgentStat search index contains billions of home sale data points and millions of real estate agents. When we index a home sale, we add all the relevant information to our database.";
    LeftBtnTitle.textContent = "How Search works: Overview";
    RightBtnTitle.textContent = "Search Algorithms";
    container.appendChild(heading1);
    container.appendChild(heading2);
    container.appendChild(para1);
    container.appendChild(heading3);
    container.appendChild(para2);
    mainBox.appendChild(container);
    scrollToTop();
  }

  function searchAlgo() {
    const mainBox = document.querySelector(".main");
    const RightBtnTitle = document.getElementById("RightBtnH4");
    const LeftBtnTitle = document.getElementById("LeftBtnH4");
    while (mainBox.firstChild) {
      mainBox.removeChild(mainBox.firstChild);
    }
    const Overview = document.querySelector("#Overview");
    const Organizing = document.querySelector("#Organizing");
    const Search = document.querySelector("#Search");

    Overview.style.border = "none";
    Organizing.style.border = "none";
    Search.style.borderBottom = "4px solid rgb(7, 131, 255)";

    const container = document.createElement("div");
    const heading = document.createElement("h1");
    const para = document.createElement("p");
    heading.setAttribute("class", "headingOfSearchAlgo");
    para.setAttribute("class", "paraOfSearchAlgo");
    heading.textContent = "How search algorithms work";
    para.innerHTML =
      "With the amount of home sales and raw data online, it would be nearly impossible to find the actual best agent, based on data-driven results, without some help sorting through it all. AgentStat’s ranking systems are designed to do just that - sort through billions of data points and millions of real estate agents in our search index to find the most relevant, useful agent based on the exact property you are trying to sell. These ranking systems are made up of not one, but a whole series of algorithms. To give you the best real estate agent, our algorithms look at many factors, including home type, price, days on market, success rate, list to sold price ratio, and location. <span> The weight applied to each factor varies depending on the nature of your query. For example, a home sale similar to yours plays a bigger role in ranking the agent responsible, than a dissimilar home in a different area.</span>";
    heading.style.fontSize = "45px";
    para.style.lineHeight = "1.8";
    para.style.color = "rgb(105, 105, 105)";
    heading.style.marginBottom = "55px";
    para.style.fontSize = "20px";
    LeftBtnTitle.textContent = "Organizing Transactions";
    RightBtnTitle.textContent = "How Search works: Overview";
    container.appendChild(heading);
    container.appendChild(para);
    mainBox.appendChild(container);

    isContentAdded = false;
    scrollToTop();
  }

  function NextPage() {
    let nextPageIndex = (currentPageIndex + 1) % pages.length;

    currentPageIndex = nextPageIndex;

    if (nextPageIndex === 0) {
      OverviewPage();
    } else if (nextPageIndex === 1) {
      OrganizingPage();
    } else if (nextPageIndex === 2) {
      searchAlgo();
    }
    scrollToTop();
  }

  function previousPage() {
    let previousPageIndex =
      (currentPageIndex - 1 + pages.length) % pages.length;

    currentPageIndex = previousPageIndex;

    if (previousPageIndex === 0) {
      OverviewPage();
    } else if (previousPageIndex === 1) {
      OrganizingPage();
    } else if (previousPageIndex === 2) {
      searchAlgo();
    }
    scrollToTop();
  }
</script>

<div class="mainContainer">
  <div class="home">
    <div class="logo-holder">
      <div class="nav-bar--head">
        <a href="/" class="logo">
            <img alt="agentstat-logo" src="/images/logo-beta.png"> 
        </a>
    </div>
    </div>
  </div>
  <div class="nav">
    <div class="Items">
      <button id="Overview" on:click={OverviewPage}>Overview</button>
      <button id="Organizing" on:click={OrganizingPage}
        >Organizing Transactions</button
      >
      <button id="Search" on:click={searchAlgo}>Search Algorithms</button>
    </div>
  </div>
  <div class="mainContainerOfmain">
    <div class="main">
      <h1 class="h1OverView h1">How AgentStat search works</h1>
      <p class="p1OverView p">
        Every time you search, there are hundreds, sometimes thousands, of real
        estate agents with varying knowledge, experience and results. How
        AgentStat figures out which Agents to show starts long before you even
        type, and is guided by a commitment to provide the best information.
      </p>
      <div class="videoContainer">
        <video autoplay muted>
          <source
            src="https://realtorstat.com/howsearchwork_assets/videos/how_agentstat_works.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <h1 class="h2OverView h1">Organizing real estate transactions</h1>
      <p class="p2OverView p">
        Even before you search, AgentStat organizes all of the data points that
        are relevant to find the best agent. These include: Home type, price,
        days on market, success rate, list to sold price ratio, and location.
      </p>
      <div class="videoContainer">
        <video autoplay muted>
          <source
            src="https://realtorstat.com/howsearchwork_assets/videos/Organizing_real_estate_transactions.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <h1 class="h3OverView h1">Instantly matching your search</h1>
      <p class="p3OverView p">
        Within seconds, AgentStat’s search algorithms sort through billions of
        data points and millions of real estate agents to find the most relevant
        agent for what you’re looking for.
      </p>
      <div class="videoContainer">
        <video autoplay muted>
          <source
            src="https://realtorstat.com/howsearchwork_assets/videos/instant_match_search.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <h1 class="h4OverView h1">We don’t sell ads, or search results</h1>
      <p class="p4OverView p">
        While other companies place agents based on the marketing spend that
        they pay, no one can buy better placement in our results.
      </p>
      <div class="videoContainer">
        <video autoplay muted>
          <source
            src="https://realtorstat.com/howsearchwork_assets/videos/We_Dont_sell_ads_or_search_results_V1.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <h1 class="h5OverView h1">Always improving your experience</h1>
      <p class="p5OverView p">
        We know agent searching can always be improved. Our AgentStat engineers
        spend every day testing and conducting experiments, resulting in
        constant improvements.
      </p>
      <div class="videoContainer">
        <video autoplay muted>
          <source
            src="https://realtorstat.com/howsearchwork_assets/videos/Always_improving_your_experience.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  </div>
</div>
<div class="foot">
  <div class="LeftBtn">
    <!-- svelte-ignore a11y-missing-content -->
    <h4 id="LeftBtnH4" />
    <button class="Left" on:click={previousPage}>⇤</button>
  </div>
  <div class="rightBtn">
    <!-- svelte-ignore a11y-missing-content -->
    <h4 id="RightBtnH4" />
    <button class="Right" on:click={NextPage}>⇥</button>
  </div>
</div>

<style src="./about-us.scss"></style>
