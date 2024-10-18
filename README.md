<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bettingcroc/bettingcroc_app">
    <img src="frontend/src/home.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">BettingCroc Application</h3>

  <p align="center">
    BettingCroc is my biggest personal project until now. It is a web3 dapp allowing users to bet on sport events with an unique system called Pools Payout Mechanism (PPM) to ensure funding and distribution of winnings. The platform also allows players to create their own bets among friends or open to the public, known as peer-to-peer (P2P) bets. Project launch failed but it was a great way to learn about web3, project management and more.
    <br />
    <br />
    <br />
    <a href="/whitepaper.pdf"><strong>Explore the whitepaper »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node.js][Node.js]][Node.js-url]
* [![Solidity][Solidity]][Solidity-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

You can run the application creating a db file, deploying smart contract of betting engine and 2 tokens contracts (1 stablecoin and 1 BettingCroc token).

### Prerequisites

First install npm dependencies.
* npm
  ```sh
  cd backend
  npm i

  cd frontend
  npm i
  ```

### Installation

1. Get an API Key at [https://allsportsapi.com](https://allsportsapi.com)
2. Clone the repo
   ```sh
   git clone https://github.com/achille1017/bettingcroc_app.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Deploy smart contracts from sol folder and update config files
   ```js
   //in backend/config.js
   const multiBetAddress = "YOUR ADDRESS CONTRACT"
   // in frontend/configWebApp.js
   const MULTIBET_ADDRESS = "YOUR ADDRESS CONTRACT";
   const USDC_ADDRESS = "YOUR ADDRESS CONTRACT";
   const BCROC_ADDRESS = "YOUR ADDRESS CONTRACT";
   ```
6. Run 
   ```sh
   cd scripts
   cd webapp
   node server.js
   cd ..
   cd betManagements
   node betCreator2.js
   node betCloser.js
   node betEnder2.js
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Navigate to localhost:4000 and start betting on bets the betCreator2.js will create. You can follow in the db.sqlite file the state of bets with those values : 0 = open 1 = closed 2 = ended 3 = canceled 4 = error.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Achille Dorier - [@achilledev](https://twitter.com/achilledev) - achille.dorier@protonmail.com

Project Link: [https://github.com/bettingcroc/bettingcroc_app](https://github.com/bettingcroc/bettingcroc_app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/achille-dorier
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node.js-url]: https://nodejs.org
[Solidity]: https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black
[Solidity-url]: https://soliditylang.org/