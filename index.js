//build subMenu
function buildSubMenu(givenElement, mainLinkName, linksArray) {
    givenElement.innerHTML = "";
  
    linksArray.forEach(linkElement => {
      if (mainLinkName === linkElement.text) {
        linkElement.subLinks.forEach(element => {
          const subLink = document.createElement("a");
  
          subLink.setAttribute("href", element.href)
          subLink.textContent = element.text.toUpperCase();
  
          givenElement.appendChild(subLink);
        });
        //check if current link has sublinks
        const hasSubLinks = linkElement.subLinks && linkElement.subLinks.length > 0;
  
        //Set the top position of the submenu to 100% if yes, 0 if no
        givenElement.style.top = hasSubLinks ? "100%" : "0";
      }
    });
  }
  
  // Menu data structure
  var menuLinks = [
    { text: "Home", href: "/home" },
    {text: "Politics", href: "#", subLinks: [
        { text: "2024 Election", href: "/catalog/all" },
        { text: "top selling", href: "/catalog/top" },
        { text: "search", href: "/catalog/search" },
      ],
    },
    {text: "World News", href: "#", subLinks: [
        { text: "new", href: "/orders/new" },
        { text: "pending", href: "/orders/pending" },
        { text: "history", href: "/orders/history" },
      ],
    },
    {text: "Local News", href: "#", subLinks: [
        { text: "profile", href: "/account/profile" },
        { text: "sign out", href: "/account/signout" },
      ],
    },
    {text: "Business", href: "#", subLinks: [
        { text: "profile", href: "/account/profile" },
        { text: "sign out", href: "/account/signout" },
      ],
    },
    {text: "Entertainment", href: "#", subLinks: [
        { text: "profile", href: "/account/profile" },
        { text: "sign out", href: "/account/signout" },
      ],
    },
  ];
  
  // ============= Headline =============
  const mainEl = document.querySelector("main");
  
  //Set CSS properties for main
//   mainEl.style.backgroundColor = "var(--main-bg)";
  mainEl.innerHTML = "<h1>Federal judge says House\’s use of proxy voting to pass spending bill in 2022 unconstitutional</h1>";
  mainEl.classList.add("flex-ctr");

// ============ Article ============
const bodyText = document.getElementById("article");

bodyText.style.alignContent = "left";

// function generateRepeatedText(text, times) {
//   return text.repeat(times);
// }

// window.onload = function() {
//   const repeatedText = generateRepeatedText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 10)
// }
  
  //============= Create top menu =============
  const topMenuEl = document.getElementById("top-menu"); 
  
  //Set CSS properties for top menu
  topMenuEl.style.height = "100%";
  topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
  topMenuEl.classList.add("flex-around");
  
  //============= Create nav links =============
  
  const nav = document.querySelector("nav");
  
  for (var i = 0; i < menuLinks.length; i++) {
    var link = menuLinks[i];
    var a = document.createElement("a");
    a.textContent = link.text;
    a.href = link.href;
    nav.appendChild(a);
  }
  
  //============ // ============
  const subMenuEl = document.getElementById("sub-menu"); //cache subMenuEl
  
  //Set CSS properties
  subMenuEl.style.height = "100%";
  subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
  subMenuEl.classList.add("flex-around");
  
  //Hide the sub-menu
  subMenuEl.style.position = "absolute";
  subMenuEl.style.top = "0"
  
  
  
  //============== Create anchor element for links =============
  const topMenuLinks = document.querySelectorAll("#top-menu a"); //cache anchor elements in topMenuEl
    
  function myEventListener(Event) {
   //Prevent default when main links are clicked
    Event.preventDefault();
   const anchorElement = Event.target.closest("a")
   if (!anchorElement) {
    return;
   }
   console.log(anchorElement)
  };
  
  //Loop through menu links and attach click event listener
  for (const link of topMenuLinks) {
    link.addEventListener("click", myEventListener);
  }
  //add and remove active class
  topMenuLinks.forEach(link => {
    link.addEventListener("click", function(){
      topMenuLinks.forEach(otherLink => {
        otherLink.classList.remove("active");
      });
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        this.classList.add("active");
      }
    });
  });
  
  //============ Add event listeners ==============
  
  // Loop through top menu links and attach click event listener
  topMenuLinks.forEach(link => {
      link.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent default link behavior
          
          // Add/remove 'active' class for styling
          topMenuLinks.forEach(otherLink => {
              otherLink.classList.remove("active");
          });
          this.classList.toggle("active");
  
          // Call subEventListener to handle submenu behavior
          subEventListener(this.textContent, menuLinks);
      });
  });
  
  // Submenu event listener function
  function subEventListener(clickedLinkText, menuLinks) {
      const hasSubLinks = menuLinks.find(link => link.text === clickedLinkText && link.subLinks);
  
      const subMenuEl = document.querySelector("#sub-menu");
  
      if (hasSubLinks) {
          subMenuEl.style.top = "100%";
      } else {
          subMenuEl.style.top = "0";
      }
  }
  
  //
  
  // event listener for the sub links, removes active if clicked and changes H1 element to name of the link
  subMenuEl.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
        subMenuEl.style.top = "0";
        topMenuLinks.forEach(element => {
            if (element.classList.contains('active')) {
                element.classList.remove('active');
            }
        });
        mainH1.textContent = e.target.textContent
    } else {
        return;
    }
  })