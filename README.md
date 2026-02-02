# Two-Player Trivia Battle Game

## Project Description

The **Two-Player Trivia Battle Game** is a browser-based JavaScript application where two players compete by answering trivia questions across multiple rounds. The game emphasizes turn-based gameplay, a structured question sequence, and a difficulty-based scoring system.

Trivia questions are dynamically fetched using **The Trivia API**, ensuring real-time, category-specific content.

The primary focus of this project is on JavaScript logic, API integration, and correct game flow, with minimal emphasis on UI design.

---

## Features

- Two-player turn-based gameplay
- Multiple rounds with unique category selection
- Difficulty-based scoring system
- Real-time score updates
- External API integration for trivia questions
- Final winner or draw declaration
- Prevention of category reuse across rounds

---

## Game Flow

### Screen 1: Player Setup

- Input fields for Player 1 and Player 2 names
- Both names are mandatory and must be unique
- The game proceeds only after successful validation

---

### Screen 2: Category Selection

- Displays the current round number
- Players jointly select one trivia category
- Categories used in previous rounds are removed from the list
- On starting the round, the game fetches:
  - 2 Easy questions
  - 2 Medium questions
  - 2 Hard questions

---

### Screen 3: Question Gameplay

#### Question Order

1. Easy – Player 1
2. Easy – Player 2
3. Medium – Player 1
4. Medium – Player 2
5. Hard – Player 1
6. Hard – Player 2

#### Question Display Includes

- Round number
- Category
- Difficulty level
- Current player turn
- Current scores
- Question text
- Four shuffled multiple-choice options

#### Answer Rules

- Only one option can be selected
- Correct or incorrect feedback is shown immediately
- Scores are updated instantly for correct answers
- All options are disabled after selection
- The **Next** button is enabled after answering

---

## Scoring System

| Difficulty | Points |
|----------|--------|
| Easy | 10 |
| Medium | 15 |
| Hard | 20 |
| Incorrect Answer | 0 |

---

### Screen 4: Round Summary

- **Next Round** and **End Game** buttons are displayed
- The **Next Round** button is disabled if no unused categories remain

**Next Round**
- Increments the round number
- Returns to the category selection screen
- Excludes previously used categories

**End Game**
- Proceeds to the final results screen

---

### Screen 5: Final Result

- Displays the final scores of both players
- Declares the winner based on total score
- Declares a draw if both scores are equal

---

## API Used

**The Trivia API (v2)**  
Documentation: https://the-trivia-api.com/docs/v2/

---

## Technologies Used

- HTML
- CSS
- JavaScript
- The Trivia API

---

## Project Structure

```
two-player-trivia-game/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/two-player-trivia-game.git
   ```

2. Open `index.html` in a web browser.

---

## Project Objective

The primary objective of this project is to demonstrate:

- Strong JavaScript logic
- Proper API integration
- Effective state and flow management
- Clean and maintainable code structure

The user interface is intentionally kept simple.
