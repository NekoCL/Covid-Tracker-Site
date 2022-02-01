1. Start RDBMS, our database will be "covid_tracker"
2. npm install --save qrcode
3. Start the Express server

#######################
implementation
#######################
This Site was created with HTML, CSS, JAVASCRIPT.
Vuejs was extensively used in the admin menu and navigation.
The Bootstrap framework was used to make sizing mobile responsive.
Implementation of the 3rd signin and email was done with google authentication and nodemailer
the QR generator was done through qrnode package from npm


#######################
     index.html
#######################

This is the start page of our website. There will be 3 Profile Buttons for User/Venue Owner/Admin.
Each will be used to log-on to respective category of user.

Clicking the profile buttons will pop up a box to prompt for username and password input.
Users and Venue Owners will have the option to sign-in via Google.

Users and Venue Owners that click on "Create Account" will be directed to the respective Sign-Up page.
The details will be saved into the database tables to be used for login.

Clicking the sign up button will open a pop up box asking for whether the user wants to make a user account
or an owner account. Clicking on these will direct to their respective sign up pages.

When signing up, user and email are unique and an error will popup if username or email addresss is taken.


#######################
     user.html
#######################

Users will be greeted. first_name and last_name will be pulled from database table and displayed.
There will be a Log Out button on the top-right to kill session and re-direct to index.html page.

There will be 3 buttons:
- Check In
- History
- Update Profile

Each button will pop up a box with details as below.

Check In will show a button that displays "Show Business".
Clicking "Show Business" will then display the list of all the available venues/businesses and their codes.
At the bottom of the pop up box is an input for checking in the code.

History will pop up a table that shows date/time, location and whether the venue is in a hotspot.
Checking in and viewing history will also show the newly added check in.

Update Profile allows the user to update any detail of his/hers as well as to subscribe or unsubscribe from
email notifications. Updating to a new password will also require confirmation with the current password.

#######################
     owner.html
#######################

Owners will be greeted. first_name and last_name will be pulled from database table and displayed.
There will be a Log Out button on the top-right to kill session and re-direct to index.html page.

All the available businesses will be showed in the cards.
The last card will be for adding new businesses by clicking on the giant "+" symbol.
A pop up will show up to enter the new information.

Each card will have some basic information for the relevant businesses. The display shown are:
- Business Name
- Size of the venue (**This is an important parameter to determine the capacity set by Admins/Health Officials)
- Type of business
- Capacity (**This is determined by Admins/Health Officials)
- Venue Code

The venue code is a unique identifier to generate a QR Code. Each business will have its own unique business code.
There will be a button "Get QR". A pop up box will prompt owners to generate a QR Code.
This QR Code will then be generated based on the unique business code.

When owners click on the button "Edit", a pop up box will show up to update some business details.
Owners will be able to update the business name, venue size as well as the type of business.

When owners click on the button "Remove", the business will be removed from owners's view.
(**Business is not being deleted from database since some information are crucial to determine if a user has checked
in to the respective business previously.)


#######################
     admin.html
#######################

The home page for the admins will include a dashboard showing total hotspots, user checkin count and venue count.

The menu uses vue.js for improved UX when navigating. All sections are loaded upon signing in and admins can navigate
seemlessly between them without needing to load a new page each time by hiding/showing corresponding sections.

Manage User contains a button for emailing users that are both exposed to hotspots and subscribed to emails.
This page also contains a table showing a list of users exposed to the hotspot and some details.

Create Admin page is for admins to create new admins. This is here because only admins should be able to create other admins.

Manage Hotspots contains a map, and inputs for adding and removing hotspots. A view list button will pop up the list in
a table, which updates with new hotspot additions and removals.

Manage Capacities allows admins to either restrict capacities or lift restrictions. Restrictions/lifting takes the venue
sizes and multiplies it by either 0.1 or 0.5 respectively and rounds to the nearest 10. A description above this button
also shows if restrictions are in place or not.

