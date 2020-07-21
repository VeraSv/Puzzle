'use strict'
window.onhashchange=switchToStateFromURLHash;
var SPAState={};
var url;
var x,y;
    var clickX, clickY;
    var puzzle;
    var cell;
var draggetImg=null;
var info=[];
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

            var updatePassword;
            var stringName='S_TEST';
            updatePassword=Math.random();
$.ajax({
    url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'READ' ,n : stringName, },
    uccess : readReady, error : errorHandler
  });
      
  function readReady(callresult) {
    if ( callresult.error!=undefined )
    alert(callresult.error);
    else  {
    info=JSON.parse(callresult.result);
   
    }
  }
  function getInfo() {
    updatePassword=Math.random();
    $.ajax( {
      url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
      data : { f : 'LOCKGET',  n : stringName, p : updatePassword },  success : lockGetReady, error : errorHandler
    } );
  }
  function lockGetReady(callresult) {
          
    if ( callresult.error!=undefined )
    alert(callresult.error);
    else {
      var a=prompt('Вы выйграли. Введите Ваше имя:');
    }   
      if(a) {
        a=a.replace(/^\s*|\s(?=\s)/g,'');
        if(a){
          
          info.push(a);
        }
      }
  
    $.ajax( {
      url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
      data : { f : 'UPDATE',  n : stringName, v : JSON.stringify(info),  p : updatePassword },
      success : updateReady, error : errorHandler
    } );
  }
  function updateReady(callresult) {
    if ( callresult.error!=undefined )
    alert(callresult.error);
    
  }
  
  function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
  }

function dragStart (EO) {
    EO=EO||window.event;
  
    draggetImg=EO.target;
 
}

function dragEnd (EO) {
    EO=EO||window.event;
    
    draggetImg=null;
   let table=document.getElementsByClassName('cell');
   let length=0;
   //let puzzle=document.getElementsByClassName('puzzle');
    for(var i =0; i<table.length; i++) {
        if(table[i].firstChild) {
        if(table[i].id==table[i].firstChild.id) { 
            length++;
            continue}
        else break;
        }
    }
    if (table.length==length) {
      
        getInfo();
}
}

function divDrop(EO){
    EO=EO||window.event;
    EO.preventDefault();
 
    if ( draggetImg )
        EO.currentTarget.appendChild(draggetImg);
    
}

function divDragOver(EO){
    EO=EO||window.event;
   
    
    EO.preventDefault();
}


function switchToStateFromURLHash() {
    var URLHash=window.location.hash;
    var stateStr=URLHash.substr(1);
    if (stateStr!='') {
        var parts=stateStr.split('_')
        SPAState={ pagename: parts[0]};
    }
    else SPAState={pagename:'Main'};
    
    var width=62.5;
    var height=92;
    
  
    
    function drawPage(_url) {
        var url=_url || './img/004.jpg';
        var elMini=document.createElement('img');
       elMini.setAttribute('src', url);
     
       elMini.style.position='absolute';
        elMini.style.left='0px';
        elMini.style.top='40px';
        elMini.style.width='140px';
        elMini.style.height='140px';
        document.body.appendChild(elMini);
       
        var table= document.createElement('div');
        table.style.width=width*10+'px';
        table.style.height=height*5+'px';
        table.setAttribute('id', 'table');
        table.style.position='relative';
        
        table.style.marginTop='155px'
     
        document.body.appendChild(table);

        var puzzles= document.createElement('div');
        puzzles.setAttribute('id', 'puzzles');
        puzzles.style.width=width*10+'px';
        puzzles.style.height=height*4+'px';
        
        puzzles.style.position='relative';
        puzzles.style.marginTop='-460px'
        puzzles.style.marginLeft='650px'
        document.body.appendChild(puzzles);

      


        function Table () {
            for(let j=0; j<5; j++) {
                for(let i=0; i<8; i++) {
                    this.cell=document.createElement('div');
                    this.cell.style.width=width+'px';
                    this.cell.style.height=height+'px';
                    this.cell.style.border='1px solid black';
                    this.cell.style.position='absolute';
                    this.cell.style.top=height*j+'px'
                      this.cell.style.left=width*i+'px';
                      this.cell.setAttribute('id', ' '+j+i);
                      this.cell.setAttribute('class', 'cell');
                      this.cell.addEventListener( 'drop', divDrop, false);
                      this.cell.addEventListener( 'dragover', divDragOver, false);
                    table.appendChild(this.cell);
                }
             
            }

        }
        function Puz (_url) {

          

            for(let i=0; i<8; i++) {
                for(let j=0; j<5; j++) {
                    this.puzzle=document.createElement('div');
                    this.puzzle.style.width=width+'px';
                    this.puzzle.style.height=height+'px';
                    this.puzzle.style.backgroundImage=('url('+url+')');
                    this.puzzle.style.backgroundRepead='no repead';
                    this.puzzle.style.float='left';
                   this.puzzle.setAttribute('class', 'puzzle');
                   this.puzzle.setAttribute('id', ' '+j+i)
                    this.puzzle.style.backgroundPositionX=i*(-width)+'px';
                    this.puzzle.style.backgroundPositionY=j*(-height)+'px';
                    this.puzzle.setAttribute('draggable', 'true');
                   this.puzzle.addEventListener( 'dragstart', dragStart, false);
                   this.puzzle.addEventListener('dragend', dragEnd, false);
             

                 this.puzzle.style.cursor='pointer';
                    puzzles.appendChild(this.puzzle);
                }
                
            }
        }

        var playField= new Table();
        var playPuzzle=new Puz(url);
    }

    var pageHTML="<input type=button value='Главная' onclick='switchToMainPage()'> <input type=button value='Рекорды' onclick='switchToRecordsPage()'>  <input type=button value='Настройки' onclick='switchToSettingsPage()'>";
    switch (SPAState.pagename) {
        case 'Main': 
        
        document.body.innerHTML=pageHTML;
            drawPage(url);
          
      
        
        break;
        case 'Records':
            
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    var stringName='S_TEST';
 
    $.ajax({
       url :ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
       data : { f : 'READ' ,n : stringName, },
       success : readReady, error : errorHandler
     } );
    function readReady(callresult) {
      if ( callresult.error!=undefined )
       alert(callresult.error);
      else  {
     
        info=JSON.parse(callresult.result);
        drawList( info);
       }
     };

    function drawList () {
       
      var list= document.createElement('div');
      list.style.paddingTop='50px';
     document.body.appendChild(list);
     var title=document.createElement('span');
     title.innerText='Список рекордов';
     list.innerHTML=title;

     for(var k in info) {
      var username;
      username=document.createElement('span');
      username.style.marginLeft='20px';
      username.style.fontSize='22px';
      username.style.lineHeight='27px';
      username.innerHTML=k+'<br>';
      list.appendChild(username);
     };

     }
     document.body.innerHTML=pageHTML;
     window.onresize= function() {
        document.body.innerHTML= "<input type=button value='Главная' onclick='switchToMainPage()'> <input type=button value='Рекорды' onclick='switchToRecordsPage()'>  <input type=button value='Настройки' onclick='switchToSettingsPage()'>";

       drawList();
      }
           
            break;
            case 'Settings':
                pageHTML+='<h2>Выберите картинку</h2>';
                function Img (url) {
                    var img=document.createElement('img');
                    img.setAttribute('src',url);
                    img.style.width=width*3+'px';
                    img.style.height=height*2+'px';
                    img.style.margin='15px';
                    document.body.appendChild(img);

                    img.addEventListener('click', selectImg, false);
                }

                function selectImg(EO) {
                  EO=EO||window.event;

                draggetImg=EO.target;
                url=draggetImg.src; 
                drawPage(url);
                switchToMainPage(url);
               
                }
               
                document.body.innerHTML=pageHTML;
                var img1= new Img('./img/2.JPG');
                var img2= new Img('./img/3.jpg');
                var img3= new Img('./img/004.jpg');
                break;

    }
   
   
}
    function switchToState(newState) {
        var stateStr=newState.pagename;
        location.hash=stateStr;
    }
    function switchToMainPage(_url) {
       switchToState({pagename: 'Main'});
       url=_url || './img/004.jpg';

    }
    function switchToRecordsPage() {
        switchToState({pagename: 'Records'});
 
     }
     function switchToSettingsPage() {
        switchToState({pagename: 'Settings'});
 
     }
     switchToStateFromURLHash();


