const Model = {
   userDropdown : false,
   mobileSidebar : false,
   page : "Dashboard",
   // "this" for event
   SelectedPage(){
    Model.page = this.name,
    Model.userDropdown = false,
    Model.mobileSidebar = false
   } ,
   ToggledSidebar(){
      Model.mobileSidebar = !Model.mobileSidebar
   },
   ToggledUserDropdown(){
     Model.userDropdown = !Model.userDropdown
   }
}

const Content =
    { sidebar :
        { logo :
            { url : "https://i.imgur.com/qhjYkLB.png"
            , alt : "workflow"
            }
        , links :
            [ [ "home", "Dashboard" ]
            , [ "group", "Team" ]
            , [ "folder", "Projects" ]
            , [ "calander", "Calendar" ]
            , [ "inbox", "Documents" ]
            , [ "graph-bar", "Reports" ]
            ]
        }
    , header :
        { placeholder : "Search"
        , userMenu :
            { avatar : "https://i.imgur.com/cNdiu8R.png"
            , links :
                [ "Your Profile"
                , "Settings"
                , "Sign out"
                ]
            }
        }
    }

const Home = {
    view: function() {

return m("div", {class: "flex h-full"}, 
        [(Model.mobileSidebar) ? m("button", {onclick:Model.ToggledSidebar, class:"w-full sm:hidden fixed inset-0"},[]): ""
        ,(Model.userDropdown)  ? m("button", {onclick:Model.ToggledUserDropdown, class:"w-full fixed z-20 inset-0"},): ""
        ,m("div", {class: "relative z-10"}, viewSidebar(),)
        ,m("main", {class:"bg-gray-100 w-full"},[viewHeader() 
                                                ,m("div",{class:"p-4"},m("h1",{class:"font-bold text-3xl"}, Model.page))
                                                ])
        ]
        )
    }
}
const viewSidebar = function(){
  return m("aside", {class:(Model.mobileSidebar == false) ? "absolute inset-y-0 sm:static w-80 bg-gray-800 text-white h-full transition offscreen"
            : "absolute inset-y-0 sm:static w-80 bg-gray-800 text-white h-full transition left-0"},
           [m("div", {class:"flex bg-gray-900 py-3 px-5 items-center"}, 
             [m("img", {class:"w-8 h-8", src:Content.sidebar.logo.url, alt:Content.sidebar.logo.alt},)], 
             [m("h3", {class: "pl-4 font-bold text-2xl font-mono"}, Content.sidebar.logo.alt)],
              )
            ,m("div", {class:"flex flex-col p-2"}, Content.sidebar.links.map(viewSidebarLink) )  
            ])
}
const viewSidebarLink = function([icon, label]){
  return m("button",{name:label,onclick:Model.SelectedPage,class:(label==Model.page) ? "bg-gray-900 flex items-center px-4 py-2 hover:bg-gray-900 mt-2 rounded" 
                                                                          :"flex items-center px-4 py-2 hover:bg-gray-900 mt-2 rounded"},
        [m("span",{class:"invert"},viewIcon(icon))
        ,m("span",{class:"pl-2"},label)
        ])
}

const viewHeader = function() {
  return m("header",{class:"flex items-center justify-between bg-white text-black p-4 border border-gray-200"}
  ,[m("div", {class:"flex items-center"}
     ,[m("button",{onclick:Model.ToggledSidebar, class:"sm:hidden opacity-50 w-10 h-6 border-r border-gray-600 pr-4 mr-4"},viewIcon("menu"))
      ,m("span", {class:"opacity-50 w-5 h-5 mr-4"}, viewIcon("search"))
      ,m("input", {placeholder:Content.header.placeholder},)
      ] )
   ,m("div",{class:"flex items-center relative"}
     ,[m("span", {class:"opacity-50 w-5 h-5 mr-4"}, viewIcon("notification"))
      ,m("button", {onclick:Model.ToggledUserDropdown}, m("img",{src:Content.header.userMenu.avatar
                                                     , class:"rounded-full h-8 w-8 flex items-center justify-center overflow"},[]))
      , (Model.userDropdown) ? viewUserDropdown() : []
     ])
   ]
   )
}

const viewUserDropdown = function(){
  return m("div",{class:"absolute z-30 my-2 top-100 right-0 w-48 border border-gray-200 bg-white text-gray-600 rounded shadow"},
    Content.header.userMenu.links.map(buttonDropdown))
}
const buttonDropdown= function(label){
 return m("button",{name:label,onclick:Model.SelectedPage, 
        class:"py-2 px-4 hover:bg-gray-200 w-full text-left whitespace-no-wrap"},label)
}

const viewIcon = function(icon) {
  return m("img",{src:("https://cdn.jsdelivr.net/npm/heroicons-ui@1.0.0/icons/icon-" + icon + ".svg"),alt:icon})
}

const root = document.body
m.route(root, "/home", {
    "/home" : Home,
})