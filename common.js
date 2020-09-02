const TYPE_MOVIE = 0;
const TYPE_YOUTUBE = 1;
const NO_REPEAT = 0;
const REPEAT = -1;

const loadSetting = () =>{
	var getjson = localStorage.getItem('setting');
	//alert(getjson);
	if( getjson == ""){
		return null;
	}
	
	var list = JSON.parse(getjson);
	
	return list;
}

const clearSettingForDebug = () =>{
	localStorage.setItem('setting',"");
}

//local storageに保存する
const insertStorage = (page,type,value,time,startTime,endTime,repeat=NO_REPEAT) => {
	//現状を読み込み
	var list = loadSetting();
	
	//設定を追加
	var addData = {"page":1,"type":1,"value":1,"startTime":0,"endTime":0,"repeat":0,"time":0};
	
	addData.page = page;
	addData.type = type;
	addData.value = value;
	addData.startTime = startTime;
	addData.endTime = endTime;
	addData.repeat = repeat;
	addData.time = time;
	
	if( list != null ){
		list.push(addData);
		var jsonString = JSON.stringify(list);
		localStorage.setItem('setting',jsonString);
	}else{
		var jsonString = JSON.stringify(addData);
		localStorage.setItem('setting',"["+jsonString+"]");
	}
}

//JSONデータの配列を登録する
const insertJSONList = (jsonList)=>{
	localStorage.setItem('setting',"");
	var jsonString = JSON.stringify(jsonList);
	localStorage.setItem('setting',jsonString);
}

const createJSON = (page,type,value,time,startTime,endTime,repeat=NO_REPEAT) => {

	//設定を追加
	var addData = {"page":1,"type":1,"value":1,"startTime":0,"endTime":0,"repeat":0,"time":0};
	
	addData.page = page;
	addData.type = type;
	addData.value = value;
	addData.startTime = startTime;
	addData.endTime = endTime;
	addData.repeat = repeat;
	addData.time = time;
	
	var jsonString = JSON.stringify(addData);
	
	return JSON.parse(jsonString);
}

const getYoutubeID = (url) => {
	//alert( url.slice( url.lastIndexOf('v=')+2 ) );
	return url.slice( url.lastIndexOf('v=')+2 );
}

//次のページ数を取得する
const getNextPage = (page) => {
	var list = loadSetting();
	
	page++;
	//MAXページ以上になったら1に戻る
	if( list.length < page ){
		page = 1;
	}
	
	return page;
}

//指定したページの設定を読み込む
const getStorage = (page) => {
	//現状を読み込み
	var list = loadSetting();
	var obj;
	
	//MAXページ以上になったら1に戻る
	if( list.length < page ){
		page = 1;
	}
	
	for(var i = 0; i < list.length; i++ ){
		if( page == list[i].page ){
			obj = list[i];
			break;
		}
	}
	
	return obj;
}

//ページ切り替え
const changeNextPage = (nextpage)=>{

	//次ページの情報を取得
	var netxtPage = getStorage(nextpage);
	if( netxtPage == null ){
		alert("設定がありません。設定を行ってから起動してください");
		return;
	}
	
	//ページ切り替え
    if( netxtPage.type == TYPE_MOVIE ){
	    window.location.href="move.html?value="+nextpage;
    }else{
    	window.location.href="youtube.html?value="+nextpage;
    }
}

const isYoutubeURL = (name)=> {
	if( name.indexOf("www.youtube.com") > 0 ){
		return true;
	}else{
		return false;
	}
}

//文字列から拡張子を取り出す。拡張子が無い場合はnullを返す
const getExt = (filename)=>{
	var ext = filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
	return ( ext == "" ? null:ext );
}

//設定された時刻内かどうかを返す
const isTimeIn = ( pageeData )=>{
	const now = new Date();
	let nowH = now.getHours();
	let nowM = now.getMinutes();
	
	//alert(pageeData.startTime);
	//alert(pageeData.startTime.split(":"));
	
	//開始時間
	let startTimes = pageeData.startTime.split(":");
	//alert(startTimes);
	if( startTimes.length != 2 ){
		startH = 0;
		startM = 0;
	}else{
		startH = startTimes[0];
		startM = startTimes[1];
	}
	
	//終了時間
	let endTimes = pageeData.endTime.split(":");
	//alert(endTimes);
	if( endTimes.length != 2 ){
		endH = 23;
		endM = 59;
	}else{
		endH = endTimes[0];
		endM = endTimes[1];
	}
	
	if(
		( startH <= nowH && nowH <= endH ) &&
		( startM <= nowM && nowM <= endM ) ){
		return true;
	}
	return false;
}