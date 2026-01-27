# 💰 CashStash - Mobile Expense Tracker

**CashStash** is a modern, full-stack mobile application built with **React Native** and **Firebase**. It is designed to help users track their income and expenses with ease, providing real-time feedback on their financial health through a "Smart Budgeting" system.

## 🚀 Creativity & Innovation 
Beyond the basic CRUD requirements, CashStash includes several innovative features:

* **Smart Budget Nudge (Notification System):** The app monitors your running balance. If an expense causes your balance to drop below **Rs. 1,000**, a custom warning banner is triggered to alert the user.
* **Proactive UI Feedback:** Uses an in-app banner system rather than intrusive modals to maintain a smooth user experience.
* **Real-time Analytics:** Integrated Firestore listeners to provide instant updates on income vs. expenses without manual refreshing.
* **Cloud-Sync Profile:** Support for dynamic profile management and data persistence across devices.

---

## 🛠️ Technical Stack
* **Frontend:** React Native (Expo SDK 53)
* **Language:** TypeScript (Strict Mode)
* **Backend:** Firebase (Firestore & Authentication)
* **Navigation:** Expo Router (File-based routing)
* **UI/UX:** React Native Safe Area Context, Ionicons, and Custom Animated Components.

---

## 📂 Features
- **Secure Authentication:** User signup and login via Firebase Auth.
- **Transaction Management:** Categorized logging for both Income and Expenses.
- **Dynamic Dashboard:** Overview of total balance, total income, and total expenses.
- **Profile Customization:** Personal information updates and cloud-synced account settings.
- **Smart Category System:** Auto-filtering of icons based on transaction type.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DiilaNa/Cash-Stash-Expense-Tracker.git
    ```
2. Install dependencies:

```bash
npm install
```
3. **Configure Firebase:**

- Create a project on the Firebase Console.
- Download your google-services.json (Android) and place it in the project root.
- Enable Email/Password Auth and Cloud Firestore.

4. **Run the app:**

``` Bash
npx expo start 
```
## 📱 APK Deployment
The production-ready APK is located in the relases in Git Hub.
Target OS: Android 8.0 (API level 26) or higher.

$$ 👨‍💻 Author
- Dilan Liyanaarachchi
- University Project - AMD 


---


