function myFunction() {
  
  // Declare some consts
  // These here are tailored to be easily entered and read from a spreadsheet or other relational database...

  const calId = 'somenumbers12345@group.calendar.google.com';
  const title = 'TEST EVENT'; // 'Google I/O 2015'
  const location = '14 E 23rd St New York, NY 10010'; // '800 Howard St., San Francisco, CA 94103'
  const description = 'Margs and tacos- nuff said!'; // 'A chance to hear more about Google\'s developer products.'
  const timeZone = 'America/New_York'; // 'America/Los_Angeles'
  const startDateTime = '2019-03-01T17:00:00-05:00'; // '2015-05-28T09:00:00-07:00'
  const endDateTime = '2019-03-01T18:30:00-05:00'; // '2015-05-28T17:00:00-07:00'
  const recurrenceRule = 'RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=3'; // 'RRULE:FREQ=DAILY;COUNT=2'
  const attendees = 'user1@domA.com,user2@domA.com,user1@domB.com'; // 'user1@domA.com,user2@domA.com,user3@domB.com'
  const remOverrides = 'email,30,email,24*60,email,24*60*7'; // '[{'method':, 'minutes':},{}] 'email,24 * 60,popup,15' stringified sequential
                      // key-value pairs separated by comma. eval() the separated strings when assigning to object
  const remUseDefault = false; // always false unless you want default reminders...
  
  // Construct recurrArr, attendArr, and remindArr array-objects to put into calendar.events.insert call
  
  // RecurrenceRules - an array of strings
  const recurrArr = recurrenceRule.split(',');
  
  // Attendees - an array of objects
  const attendArr = [];
  attendeesArr.forEach(function(element){
    attendArr.push({'email': element})
  });

  // Reminder Object
  const tempRemOverrides = remOverrides.split(',');
  const remindObj = {};
  const remindArr = [];
  remindObj.useDefault = remUseDefault;
  for (var cnt = 0; cnt < tempRemOverrides.length; cnt++){
    if(cnt % 2 === 0){
      remindArr.push({
        'method': tempRemOverrides[cnt],
        'minutes': eval(tempRemOverrides[cnt+1]),
      });
    }
  }
  remindObj.overrides = remindArr; 
  
  // Construct resource parameter value: event object
  // Prob want to declare this as a class eventually so can instantiate many; Can 
  // also use this as a template obj and just update vals for each line read from sheet/db, too...
  const event = {
    'summary': title,
    'location': location,
    'description': description,
    'start':{
      'dateTime': startDateTime,
      'timeZone': timeZone,
    },
    'end':{
      'dateTime': endDateTime,
      'timeZone': timeZone,
    },
    'recurrence': recurrArr,
    'attendees': attendArr,
    'reminders': remindObj,
  };
  
  // Attempt to add an event to a calendar
  Calendar.Events.insert(event, calId);
  
  // THE BELOW IS QUOTED FROM THE GOOGLE CALENDAR API GUIDES!
  // WHEN RUNNING SCRIPT FROM GOOGLE APPS SCRIPT, YOU CAN SIMPLY CALL THE
  // CALENDAR GLOBAL OBJECT TO USE THE ADVANCED API FEATURES.
  // WHEN RUNNING SCRIPT FROM ELSEWHERE THOUGH, YOU WILL NEED TO USE FETCHURL()
  // FUNCTIONS WITH REQUEST TYPE AND HEADERS.
  //
  // Refer to the JavaScript quickstart on how to setup the environment:
  // https://developers.google.com/calendar/quickstart/js
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
  // stored credentials.
  /*
  var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2015-05-28T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': '2015-05-28T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles'
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'}
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10}
      ]
    }
  };
  
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });
  
  request.execute(function(event) {
    appendPre('Event created: ' + event.htmlLink);
  });
  */
}
