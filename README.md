# checklist application
Technologies Used
Node.js: Backend server and logic.
Express: Web server framework.
EJS: Templating engine for dynamic HTML generation.
Axios: For API requests.
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone <repository-url>
cd checklist-system
2. Install Dependencies
bash
Copy code
npm install
3. Configure API Endpoint
The application fetches data from the API endpoint provided in the helpers/api.js file. Ensure it points to the correct URL:
javascript
Copy code
http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/<application-id>
4. Start the Application
bash
Copy code
npm start
The server will start at http://localhost:3000.
How to Use
Open the browser and navigate to http://localhost:3000.
View the checklist evaluation results on the dashboard.
Adding or Modifying Rules
1. Open the config/rules.js File
The rules are stored in an array of objects. Each object defines:
A unique id.
The name of the rule.
An evaluate function that takes the fetched data as input and returns true or false.
2. Add a New Rule
Example:
javascript
Copy code
{
  id: 5,
  name: 'Example Rule',
  evaluate: (data) => data.exampleField === true,
}
3. Save the File
The system will automatically include the new rule without requiring further code changes.