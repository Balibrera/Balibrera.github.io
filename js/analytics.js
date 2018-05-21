var thisUserAccount;

var currentUser = {
  oracle:'',
  sa:'',
  fullName:'',
  firstname:'',
  supervisor:'',
  account:'',
  analytics:'',
};

function getUserInfoAndCreateAnalytics(){
   getUserInfo();
   sendPageView();
}

function sendPageView(){

  //Generate Google Analytics code for such user
  if(currentUser["analytics"]!=undefined){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-96615777-1', 'auto', {userId:currentUser["analytics"]});
    ga('send', 'pageview');
    /*ga('set', 'userId', usercode);*/

}

function getUserInfo(){
  //Load user information from SP active directory
  thisUserAccount= $().SPServices.SPGetCurrentUser({
    fieldNames: ["Title","UserName"],
    debug: false,
  });
  currentUser['fullname'] = thisUserAccount['Title'];
  currentUser["firstname"] = thisUserAccount["Title"].split(' ', 1);
  currentUser["sa"] = thisUserAccount["UserName"];

  //Load user information from SP List (UserData)
  var results;
  var get_list ="UserData";
  var clientContext = SP.ClientContext.get_current();
  var query = "<View>"+
                "<Query>" +
                  "<Where>" +
                    "<Eq><FieldRef Name='LinkTitle' /><Value Type='Text'>" + currentUser["sa"] + "</Value></Eq>" +
                  "</Where>" +
                  "</Query>"+
                "<RowLimit>1</RowLimit>" +
                "<ViewFields>"+
                  "<FieldRef Name='EmployeeID'/>" +
                  "<FieldRef Name='CostCenterName'/>" +
                  "<FieldRef Name='InmediateManager'/>" +
                  "<FieldRef Name='AnalyticsID'/>" +
                "</ViewFields>"+
              "</View>";
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(query);
  var web = clientContext.get_web();
  var list = web.get_lists().getByTitle(get_list);
  clientContext.load(list);
  results = list.getItems(camlQuery);
  clientContext.load(results,'Include(EmployeeID)');
  clientContext.executeQueryAsync(
    Function.createDelegate(this, function () {

      var current = "";
      var e = results.getEnumerator();
      while(e.moveNext()){
        current = e.get_current();

        currentUser["oracle"] = current.get_item('EmployeeID');
        currentUser["supervisor"] = current.get_item('InmediateManager');
        currentUser["account"] = current.get_item('CostCenterName');
        currentUser["analytics"] = current.get_item('AnalyticsID');

      }

      return currentUser;

    }),
    Function.createDelegate(this, function () {
      console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
      return currentUser;
    })
  );
}


}





























function UserIDInclude(usr) {
	var qResults;
	var clientContext = SP.ClientContext.get_current();
	var query = "<View><Query>" + /* "<FieldRef Name='FirstName'/>" + */
							"<Where>" +
												"<Eq><FieldRef Name='LinkTitle' /><Value Type='Text'>"+ usr + "</Value></Eq>" +
											"</Where>" +
						  "</Query><RowLimit>1</RowLimit>" +
						  "<ViewFields><FieldRef Name='LinkTitle' /><FieldRef Name='AnalyticsID'/></ViewFields></View>";
	var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(query);
	//camlQuery.RowLimit(2);
	var web = clientContext.get_web();
	var list = web.get_lists().getByTitle("UserData");
	clientContext.load(list);
	qResults = list.getItems(camlQuery);
	clientContext.load(qResults,'Include(LinkTitle,AnalyticsID)');
	clientContext.executeQueryAsync(
		Function.createDelegate(this, function () { assignAnalyticsID(qResults); }),
		Function.createDelegate(this, this.onError1)
	);
}

function assignAnalyticsID(q){

	var items = q.getEnumerator();
	var currentitem;
	var usercode;
	while (items.moveNext()){
		currentitem = items.get_current();
		usercode = currentitem.get_item('AnalyticsID');
	}

	if(usercode!=undefined){

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


    ga('create', 'UA-96615777-1', 'auto', {userId:usercode});    // Creates a tracker.
    ga('send', 'pageview');                                     // Sends a pageview.
 // ga('set', 'userId', usercode);

	}

}












/**
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced?hl=es-419

 * Creates a temporary global ga object and loads analy  tics.js.
 * Paramenters o, a, and m are all used internally.  They could have been declared using 'var',
 * instead they are declared as parameters to save 4 bytes ('var ').
 *
 * @param {Window}      i The global context object.
 * @param {Document}    s The DOM document object.
 * @param {string}      o Must be 'script'.
 * @param {string}      g URL of the analytics.js script. Inherits protocol from page.
 * @param {string}      r Global name of analytics object.  Defaults to 'ga'.
 * @param {DOMElement?} a Async script tag.
 * @param {DOMElement?} m First script tag in document.
 */


function googleAnalytics(){

(function(i, s, o, g, r, a, m){
  i['GoogleAnalyticsObject'] = r; // Acts as a pointer to support renaming.

  // Creates an initial ga() function.  The queued commands will be executed once analytics.js loads.
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  },

  // Sets the time (as an integer) this tag was executed.  Used for timing hits.
  i[r].l = 1 * new Date();

  // Insert the script tag asynchronously.  Inserts above current tag to prevent blocking in
  // addition to using the async attribute.
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-XXXX-Y', 'auto'); // Creates the tracker with default parameters.
ga('send', 'pageview');            // Sends a pageview hit.

}
