# Beer Tap Dispensers :beers:

This is a Beer Tap Dispensers application built using Node.js, Express, and MongoDB. The application manages beer dispensers and tracks their usage.

## :hammer_and_wrench: Technology Stack

- Node.js
- Express
- MongoDB
- Mongoose

## :rocket: Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and MongoDB installed on your machine to run this project locally. MongoDB should be running on `localhost:27017` (the default MongoDB port).
Here is the current Url from .env `mongodb://localhost:27017/beerDispenser`

### Installation

1. Clone the repo
   ```bash
   git clone <repo_link>
   ```
2. Install NPM packages
   ```bash
   npm install
   ```
3. Run the server (development mode)
   ```bash
   npm run dev
   ```

## :clipboard: Models

### Dispenser

- `status` (open or closed)
- `flow_volume` (how many liters of beer come out per second)
- `openTime` (when the dispenser was last opened)
- `totalServed` (total volume of beer served)
- `totalRevenue` (total revenue from the dispenser)
- `pricePerLiter` (price per liter of beer)
- `totalUses` (how many times the dispenser has been used)
- `totalOpenTime` (total time the dispenser has been open in seconds)
- `currentVolume` (current volume of beer left in the dispenser)

### DispenserHistory

- `dispenser` (ID of the dispenser)
- `openedAt` (when the dispenser was opened)
- `closedAt` (when the dispenser was closed)
- `served` (volume of beer served during this use)
- `revenue` (revenue generated during this use)

## :hammer_and_wrench: Services

### DispenserService

- `createDispenser`: Creates a new dispenser with the provided data.
- `openDispenser`: Opens a dispenser. If the dispenser is already open or if its current volume is 0, it throws an error.
- `closeDispenser`: Closes a dispenser and calculates the volume of beer served, the revenue generated, and the remaining beer. If the dispenser served more than 3 litres or the remaining volume is less than 1 litre, it closes the dispenser.
- `getDispenser`: Retrieves a dispenser by ID.

### DispenserHistoryService

- `createDispenserHistory`: Creates a new dispenser history record with the provided dispenser data.
- `getReport`: Retrieves a report of dispenser usage and revenue for a given time period.

## :satellite: API Endpoints

- `POST /dispenser`: Create a new dispenser
- `PATCH /dispenser/:id/open`: Open a dispenser
- `PATCH /dispenser/:id/close`: Close a dispenser
- `GET /dispenser/:id`: Get a dispenser
- `GET /report/dispenser?startTime=<startTime>&endTime=<endTime>`: Get a report of dispenser usage and revenue for a given time period
- `GET /report/analytics/:id`: Get detailed usage and revenue data for a specific dispenser

Replace `<startTime>`, `<endTime>`, and `<id>` with actual start and end times in ISO 8601 date and time format (for example, `2023-08-01T00:00:00.000Z`) and the id of the dispenser respectively.

## :warning: Note

This application assumes that all dispensers start with the same initial volume of beer, and that this initial volume is larger than the `flow_volume * totalOpenTime`. If a dispenser's volume goes below 1 litre, the dispenser will be closed automatically.
