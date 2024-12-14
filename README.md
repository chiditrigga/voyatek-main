# Voya - Travel Itinerary Platform

Voya is a travel itinerary platform built to help users discover, plan, and organize travel destinations with ease. The platform provides users with up-to-date information on accommodations and popular tourist sites using the Booking API. It is developed with a frontend stack of **React**, **Typescript**, **Tailwind CSS**, and follows a pre-designed **Figma prototype**.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)



---

## Features

- **Travel Destination Search**: Users can search for accommodations, activities, and attractions based on location.
- **Detailed Itinerary**: Create and save custom itineraries for multiple destinations.
- **Booking API Integration**: Access live data for hotels and tourist spots.
- **Responsive Design**: Built with Tailwind CSS to ensure a seamless experience across all devices.

## Technologies Used

- **React**: For building the interactive user interface.
- **Typescript**: Provides strong typing and enhances developer productivity.
- **Tailwind CSS**: For fast and responsive styling.
- **Booking API**: Provides up-to-date information on accommodations and activities.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chiditrigga/voya.git
   cd voya
2. Install the dependencies:
   ```bash

     npm install

3. Create a .env file in the root directory and add your RapidAPI key:
   ```env
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key

4. Start the development server:
   ```bash
    npm start

   

## Usage

- **Search for Destinations**: Use the search functionality to find accommodations and attractions in a specific location.
- **Create an Itinerary**:Add hotels, activities, and attractions to your itinerary.
- **Save and Access Your Itinerary**:Save itineraries for future reference, stored in the browser's local storage and accessible via your user profile. This allows users to retrieve 
    their itineraries even after closing the browser, as long as local storage is not cleared.
  
## Api-reference
   - **Booking API**: Uses endpoints for searching hotels, popular destinations, and activities. Ensure your RapidAPI key is set in the .env file.
  
