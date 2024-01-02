# NASA Mission Control Project

Welcome to the NASA Mission Control Project! This project was part of Udemy course "Complete NodeJS Developer in 2023" where I build, in course, the projects backend. This project is designed to demonstrate the capabilities of a full-stack application using Node.js, Express, MongoDB, and React. 
It showcases how we can collect data on habitable planets, manage rocket launches, and utilize external APIs, such as SpaceX, to enhance our mission control capabilities.
Additionally, we have implemented continuous integration using GitHub Actions for efficient and automated testing.
## What I have learned
What is nodejs and how to use it.
How to connect nodejs to different databases incuding mongoDB, mySQL etc.
How to secure node backend with different middlewares and using JWT and bcrypt.
How to connect Nodejs backend to frontend like REact or Angular.

## Project Overview

The NASA Mission Control Project consists of the following components:

- **Node.js and Express Backend**: The backend of the project is built with Node.js and Express, providing the API endpoints for managing planets and rocket launches. It utilizes MongoDB as its database for storing planet data and launches.

- **React Frontend**: The frontend of the project is built using React. It displays information about habitable planets and allows users to interact with the rocket launch system. The frontend communicates with the backend API to fetch and display data.

- **MongoDB Database**: MongoDB is used to store data about habitable planets.
- The data is collected from the `kepler_data.csv` file.

- **SpaceX REST API Integration**: The project integrates with the SpaceX REST API to provide real information about rocket launches. Users can view past and future rocket launches, enhancing the realism of the project.

- **Continuous Integration with GitHub Actions**: GitHub Actions is used for continuous integration (CI). The project includes test suites to ensure the reliability of the backend and frontend code. GitHub Actions automatically runs these tests on every push to the main branch.

- **Docker Containerization**: The project is containerized using Docker. You can easily run it as a Docker container on your local machine or any Docker-compatible environment.

## How to Run

To see the NASA Mission Control Project in action, follow these steps:


1. **Pull the Docker Image**: If you haven't already, pull the Docker image from Docker Hub to your local machine:
   ```shell
   docker pull mikavee/portfoliorepo:nasa

2. **Run the Docker Container**: Start a Docker container based on the image with the following command:

   ```shell
   docker run -d -p 8000:8000 mikavee/portfoliorepo:nasa
   
3. **Access the Application**: Open your web browser and go to http://localhost:8000 to access the NASA Mission Control Project.
