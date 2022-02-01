var vueinst = new Vue({
    el: '#app',
    data: {
        dash: true,
        m_users: false,
        create: false,
        m_hotspots: false,
        m_capacities: false
    }
});

 // Open modal when user clicks button
document.getElementById("viewhotspotsadmin").onclick = function() {
    document.getElementById("adminHotspotModal").style.display = "block";
};

// Clicking outside the modal box or clicking the (x) closes it
window.onclick = function(event) {
    //Click outside
    if (event.target == document.getElementById("adminHotspotModal")) {
      document.getElementById("adminHotspotModal").style.display = "none";
    }

    //Click x
    if (event.target == document.getElementById("close-hotspot-x")) {
      document.getElementById("adminHotspotModal").style.display = "none";
    }

};

/*function checkAdmin() {
    if (loggedAsAdmin){
        console.log('Logged in as Admin');
    } else {
        window.location.href = "/index.html";
    }
}
*/
/*router.get('/admin.html', function(req, res, next) {
    var q = req.session.admin;
    if (q) {
        console.log(q);
    } else {
        console.log(q);
        res.sendStatus(401);
    }
});*/

/* Get Users Info */
function getUsersInfo() {

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('responseText '+this.responseText);
            userinfo_table = JSON.parse(this.responseText);
            console.log('userinfo_table '+userinfo_table);

            // Clear history table area
            document.getElementById("users-info").innerHTML = '';

            // Add history to table
            for(var i=0; i<userinfo_table.length; i++){
                document.getElementById("users-info").innerHTML += `<tr><td>`+userinfo_table[i].id+`</td>
                                                                            <td>`+userinfo_table[i].first_name+`</td>
                                                                            <td>`+userinfo_table[i].last_name+`</td>
                                                                            <td>`+userinfo_table[i].DOB+`</td>
                                                                            <td>`+userinfo_table[i].email+`</td>
                                                                            <td>`+userinfo_table[i].contact_number+`</td>
                                                                            <td>`+userinfo_table[i].yes_col+`</td></tr>`;
           }

        }
    };

    // Open connection to server
    xmlhttp.open("GET", "/users/usersinfo", true);

    // Send request
    xmlhttp.send();

}

/* Restrict Capacities to 10% rounded to nearest 10 */
function restrictCap(){

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Capacities reduced to 10%");
            getRestrictions();
        } else if (this.readyState == 4 && this.status >= 400) {
            console.log('responseText2: '+this.responseText);
            alert("Failed to update");
        } else {
            console.log('ch else');
        }
    };

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/restrictcapacities", true);
    xmlhttp.send();
}

/* Lift Capacity Restrictions back to 50% rounded to nearest 10 */
function liftRestrict(){

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Restrictions lifted");
            getRestrictions();
        } else if (this.readyState == 4 && this.status >= 400) {
            console.log('responseText2: '+this.responseText);
            alert("Failed to update");
        } else {
            console.log('ch else');
        }
    };

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/liftrestrictions", true);
    xmlhttp.send();
}

/* Get User Hotspot zips */
function getHotspotZipsAdmin() {

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            zip_table_a = JSON.parse(this.responseText);

            // Clear hotspot zips area
            document.getElementById("hotspot-zips").innerHTML = '';

            // Add hotspot zips
            for(var i=0; i<zip_table_a.length; i++){
                document.getElementById("hotspot-zips").innerHTML += `<tr><td>`+zip_table_a[i].hotspotzips+`</td></tr>`;
           }

        }
    };

    // Open connection to server
    xmlhttp.open("GET", "/getuserhotspot", true);

    // Send request
    xmlhttp.send();

}

/* Get Subbed Emails*/
function getSubs() {
    console.log('get subs');

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var subbed_emails = JSON.parse(this.responseText);
            console.log('subbed emails '+subbed_emails);
            console.log(subbed_emails);

            // Clear history table area
            document.getElementById("hidden-emails").innerHTML = '';

            // Save to this hidden div
            for(var i=0; i<subbed_emails.length; i++){
                document.getElementById("hidden-emails").innerHTML += subbed_emails[i].email + ', ';
            }


        } else if (this.readyState == 4 && this.status >= 400) {
            console.log('get emails failed');
        }
    };

    // Open connection to server
    xmlhttp.open("GET", "/getsubbed", true);

    // Send request
    xmlhttp.send();

}

/* Email Subbed Users */
function emailUsers() {
    console.log('email users');

    var email_hidden_subs = document.getElementById("hidden-emails").innerHTML;
    email_hidden_subs = email_hidden_subs.substring(0, email_hidden_subs.length - 2);
    console.log(email_hidden_subs);

    var email_subs_arr = email_hidden_subs.split(',');

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('em '+this.responseText);
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Email failed");
        } else {
            console.log('else');
        }
    };

    xmlhttp.open("POST", "/emailusers", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xmlhttp.send(JSON.stringify({email_subs_arr}));
}