<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/guyfrd/ticketing">
    <img src="images/tickets.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Ticketing.dev</h1>

  <p align="center">
    <h2>open tickets marketplace</h2>
      <br />
    <!-- <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a> -->
  </p>
</div>

<!-- ABOUT THE PROJECT -->
# About The Project
<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->
Ticketing.dev is an open marketplace for buying and selling tickets for a wide variety of events.
The application build with the microservices architecture, by writing the backend with Node.js and Typescript and the frontend with Next.js on top of React.js.
Every service runs in a Docker container, and manage his own data in MongoDB.
The application can be deployed as a Kubernetes cluster in a local machine or cloud environment.

Technical stack:
Microservices, Typescript, Javascript, Node.js, Express, React.js, Docker, Kubernetes, MongoDB. 

### Built With
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Docker](https://www.docker.com/)
* [Kubernetes](https://kubernetes.io/)

# Features
* list tickets for a sell
* buy a ticket or lock the price for 15 minute
* price editing
* history of orders
* user authentication 
* payments(coming soon)

<!-- GETTING STARTED -->
# Getting Started

## Prerequisites
<!-- 
This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ``` -->
* [Docker](https://docs.docker.com/engine/install/ubuntu/)
* [skaffold](https://skaffold.dev/docs/install/)
* [Kubernetes(minikube)](https://minikube.sigs.k8s.io/docs/start/)

## Installation

1. Clone the repo
   ```sh
   git clone git@github.com:guyfrd/ticketing.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. set k8s minikube envirement:
   ```sh
   minikube start
   ```
5. Generate JWT secret in the cluster: 
   ```sh
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_KEY>
   ```
6. enter the repo directory
7. run skaffold
   ```sh
   skaffold run
   ```
   for development:
   ```sh
   skaffold dev
  ```
<!-- USAGE EXAMPLES -->

# Tests
```sh
cd <SERVICE NAME>
npm test
```

# REST API (WIP)

The REST API to the Ticketing is described below. 

## auth service
- POST - /user/signin - signin with existing user name </br>
  body:
  ```javascript
  {
    "email": example@example.com,
    "password": password
  }
  ```
- POST -/user/signout - signout
- POST - /user/signup - first time log-in
  body:
  ```javascript
  {
    "email": example@example.com,
    "password": password
  }
  ```
- GET - /users/currentuser
  response: 
  ```javascript
  { "id": current-user,
    "email": current-user email
  }
  ```

## Tickets service
- GET - /tickets - get all tickets
- POST- /tickets - create new ticket
- GET -/tickets/:id - get ticket by id  
- PUT - /tickets/:id - update ticket

## Order service 
- DELETE - /orders/:orderId 
- GET - /orders - get orders by userId
- GET - /orders/:orderId
- POST - /orders - new order

<!-- CONTACT -->
<!-- # Contact -->

<!-- Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com -->

<!-- Project Link: [ticketing.dev](https://github.com/guyfrd/ticketing) -->

<!-- <p align="right">(<a href="#top">back to top</a>)</p> -->

<!-- # Roadmap -->
<!-- 
- [] Feature 1
- [] Feature 2
- [] Feature 3
    - [] Nested Feature -->
<!-- 
See the [open issues](https://github.com/guyfrd/ticketing/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>  -->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
