"# Video Portal"

### Frameworks used
 - AngularJS 1.5
 - Bootstrap 3
 - Sass

### Authentication (Routing)

 - I used UI-router and set up two main states: unauthenticated and authenticated. 
 - The authenticated state is an abstract one and has two child states: 
	authenticated.list and authenticated.detail. 
 - The main view is in client/index.html and the partials for the states are in client/partials
 - The authenticated states require the user to login. Only the unauthenticated one does not
 - The default route is to the unauthenticated state and so it serves as the entry point
 - An interceptor prevents loading of authenticated content until the user logs in
 
### UI and Layout (Components and Directives)
 
 - The page is designed to be responsive
 - Each video is wrapped in a videoWrapper directive so that I can monitor when the
   video is playing and broadcast a "stopPlaying" event from $rootScope to stop videos 
 - The default video aspect ratio is 4x3 and it can changed by setting the aspectRatio 
   binding
 - Each videoWrapper is contained in a larger videoCell component. This component 
   organizes all the video information: id, description, name, ratings, url into a
   bootstrap column
 - The videoCell component is responsible for rating videos and calculating ratings. 
   The average user rating is shown once the user rates a video. 
 - The videoCell is also able to fetch a single video details from the server given the
   video id. This feature is used on the detail page
 - Each videoCell component is wrapped in a larger videoList component. The videoList
   takes "skip" and "limit" parameters to determine how many videos to skip and load.
 - The videoList is a bootstrap row and the default setting is to have four columns as
   on the list page. The number of columns can be set by per bootstrap col-*-* spec by
   setting the columnClass binding.
 - The videoList component is responsible for getting the list of videos and setting
   up all of the child videoCells
 - An authStatus component resides in the navbar and indicates whether the user is
   logged in or not, and handles logging in and out
   
### Services
 
 - The authenticate service is used to query the server during login/logout requests
 - The videoApi service is used to get the list of videos or a single video
 - The loginModal service handles the login modal which prompts the user to login
 
 ### Factories
 
 - The user factory records whether the user is logged in or not
 - The page service is used to set the page title
 
 ### Other
 
 - A stop-load-on-change directive was used to cancel the loading of unfinished videos
   when the page is changed before the video is finished loading. I found that if I
   quickly changed pages, the second page would always load slower than the first. I
   found that the cause was due to videos from the previous page continuing to load
   on the new page. 
 - The stop-load-on-change directive halts the unfinished loading of videos on the
   origin page so that it does not affect the load time of the destination page
 
 ### Unit testing
 
 - Karma/Jasmine was used for unit testing. The unit tests can be found under test/unit
 
 ### Sass/CSS
 
 - Grunt was used to compile Sass SCSS files into a single style.css stylesheet
 - I have included my package.json which resides in the folder below client
 
 ### 3rd Party Packages
 
 - jk-rating-stars was used with the appearance slightly modified to implement the
   star rating system
 - infinite-scroll was used to implement the lazy loading feature. The page controller
   maintains an array containing the number of videos loaded on each scroll

