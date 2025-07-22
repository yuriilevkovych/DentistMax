var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const grammar = "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
const summernoteInstance = $("editor");

var editorRecDiv; 
var editorRecDivID; 
var editorRecDivSel;
var editorRecDivRange;
var editorRecDivPos;
var editorTextId;
var editorRecOnAir = false;

function voiceRecInit() {
	speechRecognitionList.addFromString(grammar, 1);
	recognition.grammars = speechRecognitionList;
	recognition.continuous = true;
	recognition.lang = "cs-CZ";
	recognition.interimResults = true;
	window.SpeechRecognition = window.webkitSpeechRecognition;

	recognition.onresult = (e) => {
		var t = '';
		for ( var i = 0 ; i < e.results.length ; i++ ) {
			t += e.results[ i ][0].transcript; 
			if ( t.indexOf( 'tečka' ) ) t = t.replaceAll( ' tečka' , '. ' ).replaceAll( 'tečka' , '. ' ).replaceAll( 'tečka' , '. ' );
			if ( t.indexOf( 'vykřičník' ) ) t = t.replaceAll( 'vykřičník' , '! ' ).replaceAll( 'vykřičník' , '! ' ).replaceAll( 'vykřičník' , '! ' );
			if ( t.indexOf( 'čárka' ) ) t = t.replaceAll( ' čárka' , ', ' ).replaceAll( 'čárka' , ', ' ).replaceAll( 'čárka' , ', ' );
			if ( t.indexOf( 'otazník' ) ) t = t.replaceAll( ' otazník' , '? ' ).replaceAll( 'otazník' , '? ' ).replaceAll( 'otazník' , '? ' );
			if ( t.indexOf( 'mezera' ) ) t = t.replaceAll( ' mezera' , ' ' ).replaceAll( 'mezera' , ' ' ).replaceAll( 'mezera' , ' ' );
			if ( t.indexOf( 'lomítko' ) ) t = t.replaceAll( ' lomítko' , '/ ' ).replaceAll( 'lomítko' , '/ ' ).replaceAll( 'lomítko' , '/ ' );
			if ( t.indexOf( 'dvoj.' ) ) t = t.replaceAll( ' dvoj.' , ': ' ).replaceAll( 'dvoj.' , ': ' ).replaceAll( 'dvoj.' , ': ' );
			if ( t.indexOf( 'dvojtečky' ) ) t = t.replaceAll( ' dvojtečky' , ': ' ).replaceAll( 'dvojtečky' , ': ' ).replaceAll( 'dvojtečky' , ': ' );
			if ( t.indexOf( 'plus' ) ) t = t.replaceAll( ' plus' , ' + ' ).replaceAll( 'plus' , ' + ' ).replaceAll( 'plus' , ' + ' );
			if ( t.indexOf( 'mínus' ) ) t = t.replaceAll( ' mínus' , ' - ' ).replaceAll( 'mínus' , ' - ' ).replaceAll( 'mínus' , ' - ' );
			if ( t.indexOf( 'krát' ) ) t = t.replaceAll( ' krát' , '* ' ).replaceAll( 'krát' , '* ' ).replaceAll( 'krát' , '*' );
			if ( t.indexOf( 'děleno' ) ) t = t.replaceAll( ' děleno' , '/ ' ).replaceAll( 'děleno' , '/ ' ).replaceAll( 'děleno' , '/ ' );
			if ( t.indexOf( 'rovná se' ) ) t = t.replaceAll( ' rovná se' , '= ' ).replaceAll( 'rovná se' , '= ' ).replaceAll( 'rovná se' , '= ' );
			if ( t.indexOf( 'jedna polovina' ) ) t = t.replaceAll( ' jedna polovina' , '1/2' ).replaceAll( 'jedna polovina' , '1/2' ).replaceAll( 'jedna polovina' , '1/2 ' );
			if ( t.indexOf( 'jedna třetina' ) ) t = t.replaceAll( ' jedna třetina' , '1/3 ' ).replaceAll( 'jedna třetina' , '= ' ).replaceAll( 'jedna třetina' , '= ' );            
			if ( t.indexOf( 'jedna čtvrtina' ) ) t = t.replaceAll( ' jedna čtvrtina' , '1/4' ).replaceAll( 'jedna čtvrtina' , '1/4 ' ).replaceAll( 'jedna čtvrtina' , '1/4' );
			// Latinský slovník 
			if ( t.indexOf( 'addukce' ) ) t = t.replaceAll( ' addukce' , 'addukce' ).replaceAll( 'addukce' , 'addukce' ).replaceAll( 'addukce' , 'addukce' );
			if ( t.indexOf( 'abdukce' ) ) t = t.replaceAll( ' abdukce' , 'abdukce ' ).replaceAll( 'abdukce' , 'abdukce' ).replaceAll( 'abdukce' , 'abdukce ' );
			if ( t.indexOf( 'dukce' ) ) t = t.replaceAll( ' dukce' , 'dukce' ).replaceAll( 'dukce' , 'dukce' ).replaceAll( 'dukce' , 'dukce' );
			if ( t.indexOf( 'extenze' ) ) t = t.replaceAll( ' extenze' , 'extenze ' ).replaceAll( 'extenze' , 'extenze' ).replaceAll( 'extenze' , 'extenze ' );
			if ( t.indexOf( 'flexe' ) ) t = t.replaceAll( ' flexe' , 'flexe' ).replaceAll( 'flexe' , 'flexe' ).replaceAll( 'flexe' , 'flexe' );
			if ( t.indexOf( 'oposice' ) ) t = t.replaceAll( ' oposice' , 'oposice ' ).replaceAll( 'oposice' , 'oposice' ).replaceAll( 'oposice' , 'oposice ' );
			if ( t.indexOf( 'pronace' ) ) t = t.replaceAll( ' pronace' , 'pronace' ).replaceAll( 'pronace' , 'pronace' ).replaceAll( 'pronace' , 'pronace' );
			if ( t.indexOf( 'rotace' ) ) t = t.replaceAll( ' rotace' , 'rotace ' ).replaceAll( 'rotace' , 'rotace' ).replaceAll( 'rotace' , 'rotace ' );
			if ( t.indexOf( 'supinace' ) ) t = t.replaceAll( ' supinace' , 'supinace' ).replaceAll( 'supinace' , 'supinace' ).replaceAll( 'supinace' , 'supinace' );
			if ( t.indexOf( 'mediální' ) ) t = t.replaceAll( ' mediální' , 'mediální ' ).replaceAll( 'mediální' , 'mediální' ).replaceAll( 'mediální' , 'mediální ' );
			if ( t.indexOf( 'laterální' ) ) t = t.replaceAll( ' laterální' , 'laterální' ).replaceAll( 'laterální' , 'laterální' ).replaceAll( 'laterální' , 'laterální' );
			if ( t.indexOf( 'ventrální' ) ) t = t.replaceAll( ' ventrální' , 'ventrální ' ).replaceAll( 'ventrální' , 'ventrální' ).replaceAll( 'ventrální' , 'ventrální ' );
			if ( t.indexOf( 'dorzálně' ) ) t = t.replaceAll( ' dorzálně' , 'dorzálně' ).replaceAll( 'dorzálně' , 'dorzálně' ).replaceAll( 'dorzálně' , 'dorzálně' );
			if ( t.indexOf( 'kraniální' ) ) t = t.replaceAll( ' kraniální' , 'kraniální ' ).replaceAll( 'kraniální' , 'kraniální' ).replaceAll( 'kraniální' , 'kraniální ' );
			if ( t.indexOf( 'kaudální' ) ) t = t.replaceAll( ' kaudální' , 'kaudální' ).replaceAll( 'kaudální' , 'kaudální' ).replaceAll( 'kaudální' , 'kaudální' );
			if ( t.indexOf( 'proximální' ) ) t = t.replaceAll( ' proximální' , 'proximální ' ).replaceAll( 'proximální' , 'proximální' ).replaceAll( 'proximální' , 'proximální ' );
			if ( t.indexOf( 'distální' ) ) t = t.replaceAll( ' distální' , 'distální' ).replaceAll( 'distální' , 'distální' ).replaceAll( 'distální' , 'distální' );
			if ( t.indexOf( 'radiální' ) ) t = t.replaceAll( ' radiální' , 'radiální ' ).replaceAll( 'radiální' , 'radiální' ).replaceAll( 'radiální' , 'radiální ' );
			if ( t.indexOf( 'ulnární' ) ) t = t.replaceAll( ' ulnární' , 'ulnární' ).replaceAll( 'ulnární' , 'ulnární' ).replaceAll( 'ulnární' , 'ulnární' );
			if ( t.indexOf( 'anterior' ) ) t = t.replaceAll( ' anterior' , 'anterior ' ).replaceAll( 'anterior' , 'anterior' ).replaceAll( 'anterior' , 'anterior ' );
			if ( t.indexOf( 'anterior' ) ) t = t.replaceAll( ' anterior' , 'anterior' ).replaceAll( 'anterior' , 'anterior' ).replaceAll( 'anterior' , 'anterior' );
			if ( t.indexOf( 'anterior' ) ) t = t.replaceAll( ' anterior' , 'anterior ' ).replaceAll( 'anterior' , 'anterior' ).replaceAll( 'anterior' , 'anterior ' );
			if ( t.indexOf( 'inferior' ) ) t = t.replaceAll( ' inferior' , 'inferior' ).replaceAll( 'inferior' , 'inferior' ).replaceAll( 'inferior' , 'inferior' );
			if ( t.indexOf( 'anteroposterior' ) ) t = t.replaceAll( ' anteroposterior' , 'anteroposterior ' ).replaceAll( 'anteroposterior' , 'anteroposterior' ).replaceAll( 'anteroposterior' , 'anteroposterior ' );
			if ( t.indexOf( 'anteversio' ) ) t = t.replaceAll( ' anteversio' , 'anteversio' ).replaceAll( 'anteversio' , 'anteversio' ).replaceAll( 'anteversio' , 'anteversio' );
			if ( t.indexOf( 'intra' ) ) t = t.replaceAll( ' intra' , 'intra ' ).replaceAll( 'intra' , 'intra' ).replaceAll( 'intra' , 'intra ' );
			if ( t.indexOf( 'dexter' ) ) t = t.replaceAll( ' dexter' , 'dexter' ).replaceAll( 'dexter' , 'dexter' ).replaceAll( 'dexter' , 'dexter' );
			if ( t.indexOf( 'sinister' ) ) t = t.replaceAll( ' sinister' , 'sinister ' ).replaceAll( 'sinister' , 'sinister' ).replaceAll( 'sinister' , 'sinister ' );
			if ( t.indexOf( 'páteř' ) ) t = t.replaceAll( ' páteř' , 'páteř' ).replaceAll( 'páteř' , 'páteř' ).replaceAll( 'páteř' , 'páteř' );
			if ( t.indexOf( 'Co os coccygis' ) ) t = t.replaceAll( ' Co os coccygis' , 'Co os coccygis ' ).replaceAll( 'Co os coccygis' , 'Co os coccygis' ).replaceAll( 'Co os coccygis' , 'Co os coccygis ' );
			if ( t.indexOf( 'costae' ) ) t = t.replaceAll( ' costae' , 'costae' ).replaceAll( 'costae' , 'costae' ).replaceAll( 'costae' , 'costae' );
			if ( t.indexOf( 'sternum' ) ) t = t.replaceAll( ' sternum' , 'sternum ' ).replaceAll( 'sternum' , 'sternum' ).replaceAll( 'sternum' , 'sternum ' );
			if ( t.indexOf( 'metakarp' ) ) t = t.replaceAll( ' metakarp' , 'metakarp' ).replaceAll( 'metakarp' , 'metakarp' ).replaceAll( 'metakarp' , 'metakarp' );
			if ( t.indexOf( 'carpus' ) ) t = t.replaceAll( ' carpus' , 'carpus ' ).replaceAll( 'carpus' , 'carpus' ).replaceAll( 'carpus' , 'carpus ' );
			if ( t.indexOf( 'radius' ) ) t = t.replaceAll( ' radius' , 'radius' ).replaceAll( 'radius' , 'radius' ).replaceAll( 'radius' , 'radius' );
			if ( t.indexOf( 'ulna' ) ) t = t.replaceAll( ' ulna' , 'ulna ' ).replaceAll( 'ulna' , 'ulna' ).replaceAll( 'ulna' , 'ulna ' );
			if ( t.indexOf( 'articulatio cubiti' ) ) t = t.replaceAll( ' articulatio cubiti' , 'articulatio cubiti' ).replaceAll( 'articulatio cubiti' , 'articulatio cubiti' ).replaceAll( 'articulatio cubiti' , 'articulatio cubiti' );
			if ( t.indexOf( 'humerus' ) ) t = t.replaceAll( ' humerus' , 'humerus ' ).replaceAll( 'humerus' , 'humerus' ).replaceAll( 'humerus' , 'humerus ' );
			if ( t.indexOf( 'articulatio humeri' ) ) t = t.replaceAll( ' articulatio humeri' , 'articulatio humeri' ).replaceAll( 'articulatio humeri' , 'articulatio humeri' ).replaceAll( 'articulatio humeri' , 'articulatio humeri' );
			if ( t.indexOf( 'clavicula' ) ) t = t.replaceAll( ' clavicula' , 'clavicula ' ).replaceAll( 'clavicula' , 'clavicula' ).replaceAll( 'clavicula' , 'clavicula ' );
			if ( t.indexOf( 'scapula' ) ) t = t.replaceAll( ' scapula' , 'scapula' ).replaceAll( 'scapula' , 'scapula' ).replaceAll( 'scapula' , 'scapula' );
			if ( t.indexOf( 'metatarz' ) ) t = t.replaceAll( ' metatarz' , 'metatarz ' ).replaceAll( 'metatarz' , 'metatarz' ).replaceAll( 'metatarz' , 'metatarz ' );
			if ( t.indexOf( 'talus' ) ) t = t.replaceAll( ' talus' , 'talus' ).replaceAll( 'talus' , 'talus' ).replaceAll( 'talus' , 'talus' );
			if ( t.indexOf( 'calcaneus' ) ) t = t.replaceAll( ' calcaneus' , 'calcaneus ' ).replaceAll( 'calcaneus' , 'calcaneus' ).replaceAll( 'calcaneus' , 'calcaneus ' );
			if ( t.indexOf( 'articulatio talocruralis' ) ) t = t.replaceAll( ' articulatio talocruralis' , 'articulatio talocruralis' ).replaceAll( 'articulatio talocruralis' , 'articulatio talocruralis' ).replaceAll( 'articulatio talocruralis' , 'articulatio talocruralis' );
			if ( t.indexOf( 'tibie' ) ) t = t.replaceAll( ' tibie' , 'tibie ' ).replaceAll( 'tibie' , 'tibie' ).replaceAll( 'tibie' , 'tibie ' );
			if ( t.indexOf( 'fibula' ) ) t = t.replaceAll( ' fibula' , 'fibula' ).replaceAll( 'fibula' , 'fibula' ).replaceAll( 'fibula' , 'fibula' );
			if ( t.indexOf( 'articulatio genus' ) ) t = t.replaceAll( ' articulatio genus' , 'articulatio genus ' ).replaceAll( 'articulatio genus' , 'articulatio genus' ).replaceAll( 'articulatio genus' , 'articulatio genus ' );
			if ( t.indexOf( 'meniscus' ) ) t = t.replaceAll( ' meniscus' , 'meniscus' ).replaceAll( 'meniscus' , 'meniscus' ).replaceAll( 'meniscus' , 'meniscus' );
			if ( t.indexOf( 'patella' ) ) t = t.replaceAll( ' patella' , 'patella ' ).replaceAll( 'patella' , 'patella' ).replaceAll( 'patella' , 'patella ' );
			if ( t.indexOf( 'femur' ) ) t = t.replaceAll( ' femur' , 'femur' ).replaceAll( 'femur' , 'femur' ).replaceAll( 'femur' , 'femur' );
			if ( t.indexOf( 'trochanter' ) ) t = t.replaceAll( ' trochanter' , 'trochanter ' ).replaceAll( 'trochanter' , 'trochanter' ).replaceAll( 'trochanter' , 'trochanter ' );
			if ( t.indexOf( 'articulatio coxae' ) ) t = t.replaceAll( ' articulatio coxae' , 'articulatio coxae' ).replaceAll( 'articulatio coxae' , 'articulatio coxae' ).replaceAll( 'articulatio coxae' , 'articulatio coxae' );
			if ( t.indexOf( 'os coxae' ) ) t = t.replaceAll( ' os coxae' , 'os coxae ' ).replaceAll( 'os coxae' , 'os coxae' ).replaceAll( 'os coxae' , 'os coxae ' );
			if ( t.indexOf( 'os ilium' ) ) t = t.replaceAll( ' os ilium' , 'os ilium' ).replaceAll( 'os ilium' , 'os ilium' ).replaceAll( 'os ilium' , 'os ilium' );
			if ( t.indexOf( 'os pubis' ) ) t = t.replaceAll( ' os pubis' , 'os pubis ' ).replaceAll( 'os pubis' , 'os pubis' ).replaceAll( 'os pubis' , 'os pubis ' );
			if ( t.indexOf( 'os ischii' ) ) t = t.replaceAll( ' os ischii' , 'os ischii' ).replaceAll( 'os ischii' , 'os ischii' ).replaceAll( 'os ischii' , 'os ischii' );
			if ( t.indexOf( 'symfýza' ) ) t = t.replaceAll( ' symfýza' , 'symfýza ' ).replaceAll( 'symfýza' , 'symfýza' ).replaceAll( 'symfýza' , 'symfýza ' );
			if ( t.indexOf( 'spina iliaca' ) ) t = t.replaceAll( ' spina iliaca' , 'spina iliaca' ).replaceAll( 'spina iliaca' , 'spina iliaca' ).replaceAll( 'spina iliaca' , 'spina iliaca' );
			if ( t.indexOf( 'abdurace' ) ) t = t.replaceAll( ' abdurace' , 'abdurace ' ).replaceAll( 'abdurace' , 'abdurace' ).replaceAll( 'abdurace' , 'abdurace ' );
			if ( t.indexOf( 'abrupce' ) ) t = t.replaceAll( ' abrupce' , 'abrupce' ).replaceAll( 'abrupce' , 'abrupce' ).replaceAll( 'abrupce' , 'abrupce' );
			if ( t.indexOf( 'acetabulum' ) ) t = t.replaceAll( ' acetabulum' , 'acetabulum ' ).replaceAll( 'acetabulum' , 'acetabulum' ).replaceAll( 'acetabulum' , 'acetabulum ' );
			if ( t.indexOf( 'acromion' ) ) t = t.replaceAll( ' acromion' , 'acromion' ).replaceAll( 'acromion' , 'acromion' ).replaceAll( 'acromion' , 'acromion' );
			if ( t.indexOf( 'adipozita' ) ) t = t.replaceAll( ' adipozita' , 'adipozita ' ).replaceAll( 'adipozita' , 'adipozita' ).replaceAll( 'adipozita' , 'adipozita ' );
			if ( t.indexOf( 'afebrilní' ) ) t = t.replaceAll( ' afebrilní' , 'afebrilní' ).replaceAll( 'afebrilní' , 'afebrilní' ).replaceAll( 'afebrilní' , 'afebrilní' );
			if ( t.indexOf( 'ankyloza' ) ) t = t.replaceAll( ' ankyloza' , 'ankyloza ' ).replaceAll( 'ankyloza' , 'ankyloza' ).replaceAll( 'ankyloza' , 'ankyloza ' );
			if ( t.indexOf( 'antalgický' ) ) t = t.replaceAll( ' antalgický' , 'antalgický' ).replaceAll( 'antalgický' , 'antalgický' ).replaceAll( 'antalgický' , 'antalgický' );
			if ( t.indexOf( 'anulus' ) ) t = t.replaceAll( ' anulus' , 'anulus ' ).replaceAll( 'anulus' , 'anulus' ).replaceAll( 'anulus' , 'anulus ' );
			if ( t.indexOf( 'anulus fibrosus' ) ) t = t.replaceAll( ' anulus fibrosus' , 'anulus fibrosus' ).replaceAll( 'anulus fibrosus' , 'anulus fibrosus' ).replaceAll( 'anulus fibrosus' , 'anulus fibrosus' );
			if ( t.indexOf( 'aponeurozitida' ) ) t = t.replaceAll( ' aponeurozitida' , 'aponeurozitida ' ).replaceAll( 'aponeurozitida' , 'aponeurozitida' ).replaceAll( 'aponeurozitida' , 'aponeurozitida ' );
			if ( t.indexOf( 'aponeuroza' ) ) t = t.replaceAll( ' aponeuroza' , 'aponeuroza' ).replaceAll( 'aponeuroza' , 'aponeuroza' ).replaceAll( 'aponeuroza' , 'aponeuroza' );
			if ( t.indexOf( 'atlas' ) ) t = t.replaceAll( ' atlas' , 'atlas ' ).replaceAll( 'atlas' , 'atlas' ).replaceAll( 'atlas' , 'atlas ' );
			if ( t.indexOf( 'articulatio' ) ) t = t.replaceAll( ' articulatio' , 'articulatio ' ).replaceAll( 'articulatio' , 'articulatio' ).replaceAll( 'articulatio' , 'articulatio ' );
			if ( t.indexOf( 'artritida' ) ) t = t.replaceAll( ' artritida' , 'artritida' ).replaceAll( 'artritida' , 'artritida' ).replaceAll( 'artritida' , 'artritida' );
			if ( t.indexOf( 'arthritis uratica' ) ) t = t.replaceAll( ' arthritis uratica' , 'arthritis uratica ' ).replaceAll( 'arthritis uratica' , 'arthritis uratica' ).replaceAll( 'arthritis uratica' , 'arthritis uratica ' );
			if ( t.indexOf( 'artroza' ) ) t = t.replaceAll( ' artroza' , 'artroza' ).replaceAll( 'artroza' , 'artroza' ).replaceAll( 'artroza' , 'artroza' );
			if ( t.indexOf( 'aseptický' ) ) t = t.replaceAll( ' aseptický' , 'aseptický ' ).replaceAll( 'aseptický' , 'aseptický' ).replaceAll( 'aseptický' , 'aseptický ' );
			if ( t.indexOf( 'atrofie' ) ) t = t.replaceAll( ' atrofie' , 'atrofie' ).replaceAll( 'atrofie' , 'atrofie' ).replaceAll( 'atrofie' , 'atrofie' );
			if ( t.indexOf( 'atlantookcipitální' ) ) t = t.replaceAll( ' atlantookcipitální' , 'atlantookcipitální ' ).replaceAll( 'atlantookcipitální' , 'atlantookcipitální' ).replaceAll( 'atlantookcipitální' , 'atlantookcipitální ' );
			if ( t.indexOf( 'bilaterální' ) ) t = t.replaceAll( ' bilaterální' , 'bilaterální' ).replaceAll( 'bilaterální' , 'bilaterální' ).replaceAll( 'bilaterální' , 'bilaterální' );
			if ( t.indexOf( 'brachyrachie' ) ) t = t.replaceAll( ' brachyrachie' , 'brachyrachie ' ).replaceAll( 'brachyrachie' , 'brachyrachie' ).replaceAll( 'brachyrachie' , 'brachyrachie ' );
			if ( t.indexOf( 'burzitida' ) ) t = t.replaceAll( ' burzitida' , 'burzitida' ).replaceAll( 'burzitida' , 'burzitida' ).replaceAll( 'burzitida' , 'burzitida' );
			if ( t.indexOf( 'cauda' ) ) t = t.replaceAll( ' cauda' , 'cauda ' ).replaceAll( 'cauda' , 'cauda' ).replaceAll( 'cauda' , 'cauda ' );
			if ( t.indexOf( 'cephalalgie' ) ) t = t.replaceAll( ' cephalalgie' , 'cephalalgie' ).replaceAll( 'cephalalgie' , 'cephalalgie' ).replaceAll( 'cephalalgie' , 'cephalalgie' );
			if ( t.indexOf( 'cervikokraniální' ) ) t = t.replaceAll( ' cervikokraniální' , 'cervikokraniální ' ).replaceAll( 'cervikokraniální' , 'cervikokraniální' ).replaceAll( 'cervikokraniální' , 'cervikokraniální ' );
			if ( t.indexOf( 'cervikalizace' ) ) t = t.replaceAll( ' cervikalizace' , 'cervikalizace' ).replaceAll( 'cervikalizace' , 'cervikalizace' ).replaceAll( 'cervikalizace' , 'cervikalizace' );
			if ( t.indexOf( 'cervikální migrena' ) ) t = t.replaceAll( ' cervikální migrena' , 'cervikální migrena' ).replaceAll( 'cervikální migrena' , 'cervikální migrena' ).replaceAll( 'cervikální migrena' , 'cervikální migrena ' );
			if ( t.indexOf( 'cirkumflexe' ) ) t = t.replaceAll( ' cirkumflexe' , 'cirkumflexe' ).replaceAll( 'cirkumflexe' , 'cirkumflexe' ).replaceAll( 'cirkumflexe' , 'cirkumflexe' );
			if ( t.indexOf( 'claudicatio intermittens' ) ) t = t.replaceAll( ' claudicatio intermittens' , 'claudicatio intermittens ' ).replaceAll( 'claudicatio intermittens' , 'claudicatio intermittens' ).replaceAll( 'claudicatio intermittens' , 'claudicatio intermittens ' );
			if ( t.indexOf( 'collum' ) ) t = t.replaceAll( ' collum' , 'collum' ).replaceAll( 'collum' , 'collum' ).replaceAll( 'collum' , 'collum' );
			if ( t.indexOf( 'congenitalis' ) ) t = t.replaceAll( ' congenitalis' , 'congenitalis ' ).replaceAll( 'congenitalis' , 'congenitalis' ).replaceAll( 'congenitalis' , 'congenitalis ' );
			if ( t.indexOf( 'coxa' ) ) t = t.replaceAll( ' coxa' , 'coxa' ).replaceAll( 'coxa' , 'coxa' ).replaceAll( 'coxa' , 'coxa' );
			if ( t.indexOf( 'coxa plana' ) ) t = t.replaceAll( ' coxa plana' , 'coxa plana ' ).replaceAll( 'coxa plana' , 'coxa plana' ).replaceAll( 'coxa plana' , 'coxa plana ' );
			if ( t.indexOf( 'coxa valga' ) ) t = t.replaceAll( ' coxa valga' , 'coxa valga' ).replaceAll( 'coxa valga' , 'coxa valga' ).replaceAll( 'coxa valga' , 'coxa valga' );
			if ( t.indexOf( 'coxa vara' ) ) t = t.replaceAll( ' coxa vara' , 'coxa vara ' ).replaceAll( 'coxa vara' , 'coxa vara' ).replaceAll( 'coxa vara' , 'coxa vara ' );
			if ( t.indexOf( 'coxagra' ) ) t = t.replaceAll( ' coxagra' , 'coxagra' ).replaceAll( 'coxagra' , 'coxagra' ).replaceAll( 'coxagra' , 'coxagra' );
			if ( t.indexOf( 'coxalgie' ) ) t = t.replaceAll( ' coxalgie' , 'coxalgie ' ).replaceAll( 'coxalgie' , 'coxalgie' ).replaceAll( 'coxalgie' , 'coxalgie ' );
			if ( t.indexOf( 'coxarthropathia' ) ) t = t.replaceAll( ' coxarthropathia' , 'coxarthropathia' ).replaceAll( 'coxarthropathia' , 'coxarthropathia' ).replaceAll( 'coxarthropathia' , 'coxarthropathia' );
			if ( t.indexOf( 'coxarthrosis' ) ) t = t.replaceAll( ' coxarthrosis' , 'coxarthrosis ' ).replaceAll( 'coxarthrosis' , 'coxarthrosis' ).replaceAll( 'coxarthrosis' , 'coxarthrosis ' );
			if ( t.indexOf( 'coxitis' ) ) t = t.replaceAll( ' coxitis' , 'coxitis' ).replaceAll( 'coxitis' , 'coxitis' ).replaceAll( 'coxitis' , 'coxitis' );
			if ( t.indexOf( 'cytostatický' ) ) t = t.replaceAll( ' cytostatický' , 'cytostatický ' ).replaceAll( 'cytostatický' , 'cytostatický' ).replaceAll( 'cytostatický' , 'cytostatický ' );
			if ( t.indexOf( 'defectus' ) ) t = t.replaceAll( ' defectus' , 'defectus' ).replaceAll( 'defectus' , 'defectus' ).replaceAll( 'defectus' , 'defectus' );
			if ( t.indexOf( 'dekalcifikace' ) ) t = t.replaceAll( ' dekalcifikace' , 'dekalcifikace ' ).replaceAll( 'dekalcifikace' , 'dekalcifikace' ).replaceAll( 'dekalcifikace' , 'dekalcifikace ' );
			if ( t.indexOf( 'dekompresivní' ) ) t = t.replaceAll( ' dekompresivní' , 'dekompresivní' ).replaceAll( 'dekompresivní' , 'dekompresivní' ).replaceAll( 'dekompresivní' , 'dekompresivní' );
			if ( t.indexOf( 'demineralizace' ) ) t = t.replaceAll( ' demineralizace' , 'demineralizace ' ).replaceAll( 'demineralizace' , 'demineralizace' ).replaceAll( 'demineralizace' , 'demineralizace ' );
			if ( t.indexOf( 'dextroflexe' ) ) t = t.replaceAll( ' dextroflexe' , 'dextroflexe' ).replaceAll( 'dextroflexe' , 'dextroflexe' ).replaceAll( 'dextroflexe' , 'dextroflexe' );
			if ( t.indexOf( 'dextrotorze' ) ) t = t.replaceAll( ' dextrotorze' , 'dextrotorze ' ).replaceAll( 'dextrotorze' , 'dextrotorze' ).replaceAll( 'dextrotorze' , 'dextrotorze ' );
			if ( t.indexOf( 'diafýza' ) ) t = t.replaceAll( ' diafýza' , 'diafýza' ).replaceAll( 'diafýza' , 'diafýza' ).replaceAll( 'diafýza' , 'diafýza' );
			if ( t.indexOf( 'discus intervertebralis' ) ) t = t.replaceAll( ' discus intervertebralis' , 'discus intervertebralis ' ).replaceAll( 'discus intervertebralis' , 'discus intervertebralis' ).replaceAll( 'discus intervertebralis' , 'discus intervertebralis ' );
			if ( t.indexOf( 'discopathia' ) ) t = t.replaceAll( ' discopathia' , 'discopathia' ).replaceAll( 'discopathia' , 'discopathia' ).replaceAll( 'discopathia' , 'discopathia' );
			if ( t.indexOf( 'dislokace' ) ) t = t.replaceAll( ' dislokace' , 'dislokace ' ).replaceAll( 'dislokace' , 'dislokace' ).replaceAll( 'dislokace' , 'dislokace ' );
			if ( t.indexOf( 'distorze' ) ) t = t.replaceAll( ' distorze' , 'distorze' ).replaceAll( 'distorze' , 'distorze' ).replaceAll( 'distorze' , 'distorze' );
			if ( t.indexOf( 'dysfunkce' ) ) t = t.replaceAll( ' dysfunkce' , 'dysfunkce ' ).replaceAll( 'dysfunkce' , 'dysfunkce' ).replaceAll( 'dysfunkce' , 'dysfunkce ' );
			if ( t.indexOf( 'dysmotilita' ) ) t = t.replaceAll( ' dysmotilita' , 'dysmotilita' ).replaceAll( 'dysmotilita' , 'dysmotilita' ).replaceAll( 'dysmotilita' , 'dysmotilita' );
			if ( t.indexOf( 'dysmyotonie' ) ) t = t.replaceAll( ' dysmyotonie' , 'dysmyotonie ' ).replaceAll( 'dysmyotonie' , 'dysmyotonie' ).replaceAll( 'dysmyotonie' , 'dysmyotonie ' );
			if ( t.indexOf( 'dysodynie' ) ) t = t.replaceAll( ' dysodynie' , 'dysodynie' ).replaceAll( 'dysodynie' , 'dysodynie' ).replaceAll( 'dysodynie' , 'dysodynie' );
			if ( t.indexOf( 'dysestézie' ) ) t = t.replaceAll( ' dysestézie' , 'dysestézie ' ).replaceAll( 'dysestézie' , 'dysestézie' ).replaceAll( 'dysestézie' , 'dysestézie ' );
			if ( t.indexOf( 'dysbazie' ) ) t = t.replaceAll( ' dysbazie' , 'dysbazie ' ).replaceAll( 'dysbazie' , 'dysbazie' ).replaceAll( 'dysbazie' , 'dysbazie ' );
			if ( t.indexOf( 'dysplazie' ) ) t = t.replaceAll( ' dysplazie' , 'dysplazie' ).replaceAll( 'dysplazie' , 'dysplazie' ).replaceAll( 'dysplazie' , 'dysplazie' );
			if ( t.indexOf( 'edém' ) ) t = t.replaceAll( ' edém' , 'edém ' ).replaceAll( 'edém' , 'edém' ).replaceAll( 'edém' , 'edém ' );
			if ( t.indexOf( 'elevátor' ) ) t = t.replaceAll( ' elevátor' , 'elevátor' ).replaceAll( 'elevátor' , 'elevátor' ).replaceAll( 'elevátor' , 'elevátor' );
			if ( t.indexOf( 'elevace' ) ) t = t.replaceAll( ' elevace' , 'elevace ' ).replaceAll( 'elevace' , 'elevace' ).replaceAll( 'elevace' , 'elevace ' );
			if ( t.indexOf( 'epifýza' ) ) t = t.replaceAll( ' epifýza' , 'epifýza' ).replaceAll( 'epifýza' , 'epifýza' ).replaceAll( 'epifýza' , 'epifýza' );
			if ( t.indexOf( 'enthesopathia' ) ) t = t.replaceAll( ' enthesopathia' , 'enthesopathia ' ).replaceAll( 'enthesopathia' , 'enthesopathia' ).replaceAll( 'enthesopathia' , 'enthesopathia ' );
			if ( t.indexOf( 'erosio' ) ) t = t.replaceAll( ' erosio' , 'erosio' ).replaceAll( 'erosio' , 'erosio' ).replaceAll( 'erosio' , 'erosio' );
			if ( t.indexOf( 'extenze' ) ) t = t.replaceAll( ' extenze' , 'extenze ' ).replaceAll( 'extenze' , 'extenze' ).replaceAll( 'extenze' , 'extenze ' );
			if ( t.indexOf( 'extruze' ) ) t = t.replaceAll( ' extruze' , 'extruze' ).replaceAll( 'extruze' , 'extruze' ).replaceAll( 'extruze' , 'extruze' );
			if ( t.indexOf( 'fascie' ) ) t = t.replaceAll( ' fascie' , 'fascie ' ).replaceAll( 'fascie' , 'fascie' ).replaceAll( 'fascie' , 'fascie ' );
			if ( t.indexOf( 'fissura' ) ) t = t.replaceAll( ' fissura' , 'fissura' ).replaceAll( 'fissura' , 'fissura' ).replaceAll( 'fissura' , 'fissura' );
			if ( t.indexOf( 'fixace' ) ) t = t.replaceAll( ' fixace' , 'fixace ' ).replaceAll( 'fixace' , 'fixace' ).replaceAll( 'fixace' , 'fixace ' );
			if ( t.indexOf( 'fixní' ) ) t = t.replaceAll( ' fixní' , 'fixní' ).replaceAll( 'fixní' , 'fixní' ).replaceAll( 'fixní' , 'fixní' );
			if ( t.indexOf( 'flexe' ) ) t = t.replaceAll( ' flexe' , 'flexe ' ).replaceAll( 'flexe' , 'flexe' ).replaceAll( 'flexe' , 'flexe ' );
			if ( t.indexOf( 'fossa' ) ) t = t.replaceAll( ' fossa' , 'fossa' ).replaceAll( 'fossa' , 'fossa' ).replaceAll( 'fossa' , 'fossa' );
			if ( t.indexOf( 'foramen' ) ) t = t.replaceAll( ' foramen' , 'foramen ' ).replaceAll( 'foramen' , 'foramen' ).replaceAll( 'foramen' , 'foramen ' );
			if ( t.indexOf( 'foramen costotransversarium' ) ) t = t.replaceAll( ' foramen costotransversarium' , 'foramen costotransversarium' ).replaceAll( 'foramen costotransversarium' , 'foramen costotransversarium' ).replaceAll( 'foramen costotransversarium' , 'foramen costotransversarium' );
			if ( t.indexOf( 'arterie' ) ) t = t.replaceAll( ' arterie' , 'arterie ' ).replaceAll( 'arterie' , 'arterie' ).replaceAll( 'arterie' , 'arterie ' );
			if ( t.indexOf( 'fraktura' ) ) t = t.replaceAll( ' fraktura' , 'fraktura' ).replaceAll( 'fraktura' , 'fraktura' ).replaceAll( 'fraktura' , 'fraktura' );
			if ( t.indexOf( 'gonartroza' ) ) t = t.replaceAll( ' gonartroza' , 'gonartroza ' ).replaceAll( 'gonartroza' , 'gonartroza' ).replaceAll( 'gonartroza' , 'gonartroza ' );
			if ( t.indexOf( 'hallux' ) ) t = t.replaceAll( ' hallux' , 'hallux' ).replaceAll( 'hallux' , 'hallux' ).replaceAll( 'hallux' , 'hallux' );
			if ( t.indexOf( 'hallux valgus' ) ) t = t.replaceAll( ' hallux valgus' , 'hallux valgus ' ).replaceAll( 'hallux valgus' , 'hallux valgus' ).replaceAll( 'hallux valgus' , 'hallux valgus ' );
			if ( t.indexOf( 'hematom' ) ) t = t.replaceAll( ' hematom' , 'hematom' ).replaceAll( 'hematom' , 'hematom' ).replaceAll( 'hematom' , 'hematom' );
			if ( t.indexOf( 'hernie' ) ) t = t.replaceAll( ' hernie' , 'hernie ' ).replaceAll( 'hernie' , 'hernie' ).replaceAll( 'hernie' , 'hernie ' );
			if ( t.indexOf( 'herniace' ) ) t = t.replaceAll( ' herniace' , 'herniace' ).replaceAll( 'herniace' , 'herniace' ).replaceAll( 'herniace' , 'herniace' );
			if ( t.indexOf( 'hypoplasie' ) ) t = t.replaceAll( ' hypoplasie' , 'hypoplasie ' ).replaceAll( 'hypoplasie' , 'hypoplasie' ).replaceAll( 'hypoplasie' , 'hypoplasie ' );
			if ( t.indexOf( 'chondrosa' ) ) t = t.replaceAll( ' chondrosa' , 'chondrosa' ).replaceAll( 'chondrosa' , 'chondrosa' ).replaceAll( 'chondrosa' , 'chondrosa' );
			if ( t.indexOf( 'idoipatický' ) ) t = t.replaceAll( ' idoipatický' , 'idoipatický ' ).replaceAll( 'idoipatický' , 'idoipatický' ).replaceAll( 'idoipatický' , 'idoipatický ' );
			if ( t.indexOf( 'incipiens' ) ) t = t.replaceAll( ' incipiens' , 'incipiens' ).replaceAll( 'incipiens' , 'incipiens' ).replaceAll( 'incipiens' , 'incipiens' );
			if ( t.indexOf( 'inferior' ) ) t = t.replaceAll( ' inferior' , 'inferior ' ).replaceAll( 'inferior' , 'inferior' ).replaceAll( 'inferior' , 'inferior ' );
			if ( t.indexOf( 'infrakce' ) ) t = t.replaceAll( ' infrakce' , 'infrakce' ).replaceAll( 'infrakce' , 'infrakce' ).replaceAll( 'infrakce' , 'infrakce' );
			if ( t.indexOf( 'insuficience' ) ) t = t.replaceAll( ' insuficience' , 'insuficience ' ).replaceAll( 'insuficience' , 'insuficience' ).replaceAll( 'insuficience' , 'insuficience ' );
			if ( t.indexOf( 'intermitentní' ) ) t = t.replaceAll( ' intermitentní' , 'intermitentní' ).replaceAll( 'intermitentní' , 'intermitentní' ).replaceAll( 'intermitentní' , 'intermitentní' );
			if ( t.indexOf( 'intenze' ) ) t = t.replaceAll( ' intenze' , 'intenze ' ).replaceAll( 'intenze' , 'intenze' ).replaceAll( 'intenze' , 'intenze ' );
			if ( t.indexOf( 'interosseum' ) ) t = t.replaceAll( ' interosseum' , 'interosseum' ).replaceAll( 'interosseum' , 'interosseum' ).replaceAll( 'interosseum' , 'interosseum' );
			if ( t.indexOf( 'intervertebralis' ) ) t = t.replaceAll( ' intervertebralis' , 'intervertebralis ' ).replaceAll( 'intervertebralis' , 'intervertebralis' ).replaceAll( 'intervertebralis' , 'intervertebralis ' );
			if ( t.indexOf( 'iritace' ) ) t = t.replaceAll( ' iritace' , 'iritace' ).replaceAll( 'iritace' , 'iritace' ).replaceAll( 'iritace' , 'iritace' );
			if ( t.indexOf( 'iritabilní' ) ) t = t.replaceAll( ' iritabilní' , 'iritabilní ' ).replaceAll( 'iritabilní' , 'iritabilní' ).replaceAll( 'iritabilní' , 'iritabilní ' );
			if ( t.indexOf( 'isthmus' ) ) t = t.replaceAll( ' isthmus' , 'isthmus' ).replaceAll( 'isthmus' , 'isthmus' ).replaceAll( 'isthmus' , 'isthmus' );
			if ( t.indexOf( 'isometrický' ) ) t = t.replaceAll( ' isometrický' , 'isometrický ' ).replaceAll( 'isometrický' , 'isometrický' ).replaceAll( 'isometrický' , 'isometrický ' );
			if ( t.indexOf( 'isotonický' ) ) t = t.replaceAll( ' isotonický' , 'isotonický' ).replaceAll( 'isotonický' , 'isotonický' ).replaceAll( 'isotonický' , 'isotonický' );
			if ( t.indexOf( 'juvenilní' ) ) t = t.replaceAll( ' juvenilní' , 'juvenilní ' ).replaceAll( 'juvenilní' , 'juvenilní' ).replaceAll( 'juvenilní' , 'juvenilní ' );
			if ( t.indexOf( 'juxantikulární' ) ) t = t.replaceAll( ' juxantikulární' , 'juxantikulární' ).replaceAll( 'juxantikulární' , 'juxantikulární' ).replaceAll( 'juxantikulární' , 'juxantikulární' );
			if ( t.indexOf( 'komprese' ) ) t = t.replaceAll( ' komprese' , 'komprese ' ).replaceAll( 'komprese' , 'komprese' ).replaceAll( 'komprese' , 'komprese ' );
			if ( t.indexOf( 'kondyl' ) ) t = t.replaceAll( ' kondyl' , 'kondyl' ).replaceAll( 'kondyl' , 'kondyl' ).replaceAll( 'kondyl' , 'kondyl' );
			if ( t.indexOf( 'kontrakce' ) ) t = t.replaceAll( ' kontrakce' , 'kontrakce ' ).replaceAll( 'kontrakce' , 'kontrakce' ).replaceAll( 'kontrakce' , 'kontrakce ' );
			if ( t.indexOf( 'kontraktura' ) ) t = t.replaceAll( ' kontraktura' , 'kontraktura' ).replaceAll( 'kontraktura' , 'kontraktura' ).replaceAll( 'kontraktura' , 'kontraktura' );
			if ( t.indexOf( 'kontuze' ) ) t = t.replaceAll( ' kontuze' , 'kontuze ' ).replaceAll( 'kontuze' , 'kontuze' ).replaceAll( 'kontuze' , 'kontuze ' );
			if ( t.indexOf( 'konvulze' ) ) t = t.replaceAll( ' konvulze' , 'konvulze' ).replaceAll( 'konvulze' , 'konvulze' ).replaceAll( 'konvulze' , 'konvulze' );
			if ( t.indexOf( 'korekce' ) ) t = t.replaceAll( ' korekce' , 'korekce ' ).replaceAll( 'korekce' , 'korekce' ).replaceAll( 'korekce' , 'korekce ' );
			if ( t.indexOf( 'kyfoza' ) ) t = t.replaceAll( ' kyfoza' , 'kyfoza' ).replaceAll( 'kyfoza' , 'kyfoza' ).replaceAll( 'kyfoza' , 'kyfoza' );
			if ( t.indexOf( 'labrun' ) ) t = t.replaceAll( ' labrun' , 'labrun ' ).replaceAll( 'labrun' , 'labrun' ).replaceAll( 'labrun' , 'labrun ' );
			if ( t.indexOf( 'ligamentum' ) ) t = t.replaceAll( ' ligamentum' , 'ligamentum' ).replaceAll( 'ligamentum' , 'ligamentum' ).replaceAll( 'ligamentum' , 'ligamentum' );
			if ( t.indexOf( 'lokomotorický' ) ) t = t.replaceAll( ' lokomotorický' , 'lokomotorický ' ).replaceAll( 'lokomotorický' , 'lokomotorický' ).replaceAll( 'lokomotorický' , 'lokomotorický ' );
			if ( t.indexOf( 'lordoza' ) ) t = t.replaceAll( ' lordoza' , 'lordoza' ).replaceAll( 'lordoza' , 'lordoza' ).replaceAll( 'lordoza' , 'lordoza' );
			if ( t.indexOf( 'luxace' ) ) t = t.replaceAll( ' luxace' , 'luxace ' ).replaceAll( 'luxace' , 'luxace' ).replaceAll( 'luxace' , 'luxace ' );
			if ( t.indexOf( 'lumbago' ) ) t = t.replaceAll( ' lumbago' , 'lumbago' ).replaceAll( 'lumbago' , 'lumbago' ).replaceAll( 'lumbago' , 'lumbago' );
			if ( t.indexOf( 'lumbalgie' ) ) t = t.replaceAll( ' lumbalgie' , 'lumbalgie ' ).replaceAll( 'lumbalgie' , 'lumbalgie' ).replaceAll( 'lumbalgie' , 'lumbalgie ' );
			if ( t.indexOf( 'metaplazie' ) ) t = t.replaceAll( ' metaplazie' , 'metaplazie' ).replaceAll( 'metaplazie' , 'metaplazie' ).replaceAll( 'metaplazie' , 'metaplazie' );
			if ( t.indexOf( 'musculus' ) ) t = t.replaceAll( ' musculus' , 'musculus ' ).replaceAll( 'musculus' , 'musculus' ).replaceAll( 'musculus' , 'musculus ' );
			if ( t.indexOf( 'musculatura' ) ) t = t.replaceAll( ' musculatura' , 'musculatura' ).replaceAll( 'musculatura' , 'musculatura' ).replaceAll( 'musculatura' , 'musculatura' );
			if ( t.indexOf( 'nekroza' ) ) t = t.replaceAll( ' nekroza' , 'nekroza ' ).replaceAll( 'nekroza' , 'nekroza' ).replaceAll( 'nekroza' , 'nekroza ' );
			if ( t.indexOf( 'nefritida' ) ) t = t.replaceAll( ' nefritida' , 'nefritida' ).replaceAll( 'nefritida' , 'nefritida' ).replaceAll( 'nefritida' , 'nefritida' );
			if ( t.indexOf( 'neuropatie' ) ) t = t.replaceAll( ' neuropatie' , 'neuropatie ' ).replaceAll( 'neuropatie' , 'neuropatie' ).replaceAll( 'neuropatie' , 'neuropatie ' );
			if ( t.indexOf( 'neuarthrosis' ) ) t = t.replaceAll( ' neuarthrosis' , 'neuarthrosis' ).replaceAll( 'neuarthrosis' , 'neuarthrosis' ).replaceAll( 'neuarthrosis' , 'neuarthrosis' );
			if ( t.indexOf( 'os' ) ) t = t.replaceAll( ' os' , 'os ' ).replaceAll( 'os' , 'os' ).replaceAll( 'os' , 'os ' );
			if ( t.indexOf( 'osteoperiostitida' ) ) t = t.replaceAll( ' osteoperiostitida' , 'osteoperiostitida' ).replaceAll( 'osteoperiostitida' , 'osteoperiostitida' ).replaceAll( 'osteoperiostitida' , 'osteoperiostitida' );
			if ( t.indexOf( 'osteoporóza' ) ) t = t.replaceAll( ' osteoporóza' , 'osteoporóza ' ).replaceAll( 'osteoporóza' , 'osteoporóza' ).replaceAll( 'osteoporóza' , 'osteoporóza ' );
			if ( t.indexOf( 'osifikace' ) ) t = t.replaceAll( ' osifikace' , 'osifikace' ).replaceAll( 'osifikace' , 'osifikace' ).replaceAll( 'osifikace' , 'osifikace' );
			if ( t.indexOf( 'osteofyt' ) ) t = t.replaceAll( ' osteofyt' , 'osteofyt ' ).replaceAll( 'osteofyt' , 'osteofyt' ).replaceAll( 'osteofyt' , 'osteofyt ' );
			if ( t.indexOf( 'osteochondritída' ) ) t = t.replaceAll( ' osteochondritída' , 'osteochondritída' ).replaceAll( 'osteochondritída' , 'osteochondritída' ).replaceAll( 'osteochondritída' , 'osteochondritída' );
			if ( t.indexOf( 'osteochondrolýza' ) ) t = t.replaceAll( ' osteochondrolýza' , 'osteochondrolýza ' ).replaceAll( 'osteochondrolýza' , 'osteochondrolýza' ).replaceAll( 'osteochondrolýza' , 'osteochondrolýza ' );
			if ( t.indexOf( 'osteochondropatie' ) ) t = t.replaceAll( ' osteochondropatie' , 'osteochondropatie' ).replaceAll( 'osteochondropatie' , 'osteochondropatie' ).replaceAll( 'osteochondropatie' , 'osteochondropatie' );
			if ( t.indexOf( 'osteochondroza' ) ) t = t.replaceAll( ' osteochondroza' , 'osteochondroza ' ).replaceAll( 'osteochondroza' , 'osteochondroza' ).replaceAll( 'osteochondroza' , 'osteochondroza ' );
			if ( t.indexOf( 'patela' ) ) t = t.replaceAll( ' patela' , 'patela' ).replaceAll( 'patela' , 'patela' ).replaceAll( 'patela' , 'patela' );
			if ( t.indexOf( 'planta' ) ) t = t.replaceAll( ' planta' , 'planta ' ).replaceAll( 'planta' , 'planta' ).replaceAll( 'planta' , 'planta ' );
			if ( t.indexOf( 'posttraumatický' ) ) t = t.replaceAll( ' posttraumatický' , 'posttraumatický' ).replaceAll( 'posttraumatický' , 'posttraumatický' ).replaceAll( 'posttraumatický' , 'posttraumatický' );
			if ( t.indexOf( 'pronace' ) ) t = t.replaceAll( ' pronace' , 'pronace ' ).replaceAll( 'pronace' , 'pronace' ).replaceAll( 'pronace' , 'pronace ' );
			if ( t.indexOf( 'polyartralgie' ) ) t = t.replaceAll( ' polyartralgie' , 'polyartralgie' ).replaceAll( 'polyartralgie' , 'polyartralgie' ).replaceAll( 'polyartralgie' , 'polyartralgie' );
			if ( t.indexOf( 'polyartritida' ) ) t = t.replaceAll( ' polyartritida' , 'polyartritida ' ).replaceAll( 'polyartritida' , 'polyartritida' ).replaceAll( 'polyartritida' , 'polyartritida ' );
			if ( t.indexOf( 'protruze' ) ) t = t.replaceAll( ' protruze' , 'protruze' ).replaceAll( 'protruze' , 'protruze' ).replaceAll( 'protruze' , 'protruze' );
			if ( t.indexOf( 'propulze' ) ) t = t.replaceAll( ' propulze' , 'propulze ' ).replaceAll( 'propulze' , 'propulze' ).replaceAll( 'propulze' , 'propulze ' );
			if ( t.indexOf( 'pseudoradikulární' ) ) t = t.replaceAll( ' pseudoradikulární' , 'pseudoradikulární' ).replaceAll( 'pseudoradikulární' , 'pseudoradikulární' ).replaceAll( 'pseudoradikulární' , 'pseudoradikulární' );
			if ( t.indexOf( 'periosteum' ) ) t = t.replaceAll( ' periosteum' , 'periosteum ' ).replaceAll( 'periosteum' , 'periosteum' ).replaceAll( 'periosteum' , 'periosteum ' );
			if ( t.indexOf( 'relaxace' ) ) t = t.replaceAll( ' relaxace' , 'relaxace' ).replaceAll( 'relaxace' , 'relaxace' ).replaceAll( 'relaxace' , 'relaxace' );
			if ( t.indexOf( 'radikulitida' ) ) t = t.replaceAll( ' radikulitida' , 'radikulitida ' ).replaceAll( 'radikulitida' , 'radikulitida' ).replaceAll( 'radikulitida' , 'radikulitida ' );
			if ( t.indexOf( 'radikulopatie' ) ) t = t.replaceAll( ' radikulopatie' , 'radikulopatie' ).replaceAll( 'radikulopatie' , 'radikulopatie' ).replaceAll( 'radikulopatie' , 'radikulopatie' );
			if ( t.indexOf( 'reflux' ) ) t = t.replaceAll( ' reflux' , 'reflux ' ).replaceAll( 'reflux' , 'reflux' ).replaceAll( 'reflux' , 'reflux ' );
			if ( t.indexOf( 'ruptura' ) ) t = t.replaceAll( ' ruptura' , 'ruptura' ).replaceAll( 'ruptura' , 'ruptura' ).replaceAll( 'ruptura' , 'ruptura' );
			if ( t.indexOf( 'supinace' ) ) t = t.replaceAll( ' supinace' , 'supinace ' ).replaceAll( 'supinace' , 'supinace' ).replaceAll( 'supinace' , 'supinace ' );
			if ( t.indexOf( 'subluxace' ) ) t = t.replaceAll( ' subluxace' , 'subluxace' ).replaceAll( 'subluxace' , 'subluxace' ).replaceAll( 'subluxace' , 'subluxace' );
			if ( t.indexOf( 'stenoza' ) ) t = t.replaceAll( ' stenoza' , 'stenoza ' ).replaceAll( 'stenoza' , 'stenoza' ).replaceAll( 'stenoza' , 'stenoza ' );
			if ( t.indexOf( 'spazmus' ) ) t = t.replaceAll( ' spazmus' , 'spazmus' ).replaceAll( 'spazmus' , 'spazmus' ).replaceAll( 'spazmus' , 'spazmus' );
			if ( t.indexOf( 'skolioza' ) ) t = t.replaceAll( ' skolioza' , 'skolioza ' ).replaceAll( 'skolioza' , 'skolioza' ).replaceAll( 'skolioza' , 'skolioza ' );
			if ( t.indexOf( 'spondylartroza' ) ) t = t.replaceAll( ' spondylartroza' , 'spondylartroza' ).replaceAll( 'spondylartroza' , 'spondylartroza' ).replaceAll( 'spondylartroza' , 'spondylartroza' );
			if ( t.indexOf( 'spondylalgie' ) ) t = t.replaceAll( ' spondylalgie' , 'spondylalgie ' ).replaceAll( 'spondylalgie' , 'spondylalgie' ).replaceAll( 'spondylalgie' , 'spondylalgie ' );
			if ( t.indexOf( 'spondyloschiza' ) ) t = t.replaceAll( ' spondyloschiza' , 'spondyloschiza' ).replaceAll( 'spondyloschiza' , 'spondyloschiza' ).replaceAll( 'spondyloschiza' , 'spondyloschiza' );
			if ( t.indexOf( 'syndesmóza' ) ) t = t.replaceAll( ' syndesmóza' , 'syndesmóza ' ).replaceAll( 'syndesmóza' , 'syndesmóza' ).replaceAll( 'syndesmóza' , 'syndesmóza ' );
			if ( t.indexOf( 'synostóza' ) ) t = t.replaceAll( ' synostóza' , 'synostóza' ).replaceAll( 'synostóza' , 'synostóza' ).replaceAll( 'synostóza' , 'synostóza' );
			if ( t.indexOf( 'tendo' ) ) t = t.replaceAll( ' tendo' , 'tendo ' ).replaceAll( 'tendo' , 'tendo' ).replaceAll( 'tendo' , 'tendo ' );
			if ( t.indexOf( 'tendosynovitida' ) ) t = t.replaceAll( ' tendosynovitida' , 'tendosynovitida ' ).replaceAll( 'tendosynovitida' , 'tendosynovitida' ).replaceAll( 'tendosynovitida' , 'tendosynovitida ' );
			if ( t.indexOf( 'tenodynie' ) ) t = t.replaceAll( ' tenodynie' , 'tenodynie' ).replaceAll( 'tenodynie' , 'tenodynie' ).replaceAll( 'tenodynie' , 'tenodynie' );
			if ( t.indexOf( 'tenze' ) ) t = t.replaceAll( ' tenze' , 'tenze ' ).replaceAll( 'tenze' , 'tenze' ).replaceAll( 'tenze' , 'tenze ' );
			if ( t.indexOf( 'thorakalgie' ) ) t = t.replaceAll( ' thorakalgie' , 'thorakalgie' ).replaceAll( 'thorakalgie' , 'thorakalgie' ).replaceAll( 'thorakalgie' , 'thorakalgie' );
			if ( t.indexOf( 'temporomandibulární' ) ) t = t.replaceAll( ' temporomandibulární' , 'temporomandibulární ' ).replaceAll( 'temporomandibulární' , 'temporomandibulární' ).replaceAll( 'temporomandibulární' , 'temporomandibulární ' );
			if ( t.indexOf( 'vaskulitida' ) ) t = t.replaceAll( ' vaskulitida' , 'vaskulitida' ).replaceAll( 'vaskulitida' , 'vaskulitida' ).replaceAll( 'vaskulitida' , 'vaskulitida' );
			if ( t.indexOf( 'vasomotorica' ) ) t = t.replaceAll( ' vasomotorica' , 'vasomotorica ' ).replaceAll( 'vasomotorica' , 'vasomotorica' ).replaceAll( 'vasomotorica' , 'vasomotorica ' );
			if ( t.indexOf( 'vertebrae' ) ) t = t.replaceAll( ' vertebrae' , 'vertebrae' ).replaceAll( 'vertebrae' , 'vertebrae' ).replaceAll( 'vertebrae' , 'vertebrae' );
			// Stomatologický slovník
			if ( t.indexOf( 'alveolární kost' ) ) t = t.replaceAll( ' alveolární kost' , 'alveolární kost' ).replaceAll( 'alveolární kost' , 'alveolární kost' ).replaceAll( 'alveolární kost' , 'alveolární kost' );
			if ( t.indexOf( 'analgosedace' ) ) t = t.replaceAll( ' analgosedace' , 'analgosedace ' ).replaceAll( 'analgosedace' , 'analgosedace' ).replaceAll( 'analgosedace' , 'analgosedace ' );
			if ( t.indexOf( 'bruxizmus' ) ) t = t.replaceAll( ' bruxizmus' , 'bruxizmus' ).replaceAll( 'bruxizmus' , 'bruxizmus' ).replaceAll( 'bruxizmus' , 'bruxizmus' );
			if ( t.indexOf( 'celoplášťová korunka ' ) ) t = t.replaceAll( ' celoplášťová korunka ' , 'celoplášťová korunka  ' ).replaceAll( 'celoplášťová korunka ' , 'celoplášťová korunka ' ).replaceAll( 'celoplášťová korunka ' , 'celoplášťová korunka  ' );
			if ( t.indexOf( 'dentin' ) ) t = t.replaceAll( ' dentin' , 'dentin' ).replaceAll( 'dentin' , 'dentin' ).replaceAll( 'dentin' , 'dentin' );
			if ( t.indexOf( 'endodoncie' ) ) t = t.replaceAll( ' endodoncie' , 'endodoncie ' ).replaceAll( 'endodoncie' , 'endodoncie' ).replaceAll( 'endodoncie' , 'endodoncie ' );
			if ( t.indexOf( 'endodontické ošetření' ) ) t = t.replaceAll( ' endodontické ošetření' , 'endodontické ošetření' ).replaceAll( 'endodontické ošetření' , 'endodontické ošetření' ).replaceAll( 'endodontické ošetření' , 'endodontické ošetření' );
			if ( t.indexOf( 'fasetová korunka' ) ) t = t.replaceAll( ' fasetová korunka' , 'fasetová korunka ' ).replaceAll( 'fasetová korunka' , 'fasetová korunka' ).replaceAll( 'fasetová korunka' , 'fasetová korunka ' );
			if ( t.indexOf( 'fixní můstek' ) ) t = t.replaceAll( ' fixní můstek' , 'fixní můstek' ).replaceAll( 'fixní můstek' , 'fixní můstek' ).replaceAll( 'fixní můstek' , 'fixní můstek' );
			if ( t.indexOf( 'gingiva' ) ) t = t.replaceAll( ' gingiva' , 'gingiva ' ).replaceAll( 'gingiva' , 'gingiva' ).replaceAll( 'gingiva' , 'gingiva ' );
			if ( t.indexOf( 'hemostatikum' ) ) t = t.replaceAll( ' hemostatikum' , 'hemostatikum' ).replaceAll( 'hemostatikum' , 'hemostatikum' ).replaceAll( 'hemostatikum' , 'hemostatikum' );
			if ( t.indexOf( 'intraorální incize' ) ) t = t.replaceAll( ' intraorální incize' , 'intraorální incize ' ).replaceAll( 'intraorální incize' , 'intraorální incize' ).replaceAll( 'intraorální incize' , 'intraorální incize ' );
			if ( t.indexOf( 'maxila' ) ) t = t.replaceAll( ' maxila' , 'maxila' ).replaceAll( 'maxila' , 'maxila' ).replaceAll( 'maxila' , 'maxila' );
			if ( t.indexOf( 'metalokeramická korunka' ) ) t = t.replaceAll( ' metalokeramická korunka' , 'metalokeramická korunka ' ).replaceAll( 'metalokeramická korunka' , 'metalokeramická korunka' ).replaceAll( 'metalokeramická korunka' , 'metalokeramická korunka ' );
			if ( t.indexOf( 'obličejový skelet ' ) ) t = t.replaceAll( ' obličejový skelet ' , 'obličejový skelet ' ).replaceAll( 'obličejový skelet ' , 'obličejový skelet ' ).replaceAll( 'obličejový skelet ' , 'obličejový skelet ' );			
			if ( t.indexOf( 'opalescence ' ) ) t = t.replaceAll( 'opalescence ' , 'opalescence ' ).replaceAll( 'opalescence ' , 'opalescence ' ).replaceAll( 'opalescence ' , 'opalescence ' );
			if ( t.indexOf( 'oroantrální komunikace' ) ) t = t.replaceAll( ' oroantrální komunikace' , 'oroantrální komunikace ' ).replaceAll( 'oroantrální komunikace' , 'oroantrální komunikace' ).replaceAll( 'oroantrální komunikace' , 'oroantrální komunikace ' );
			if ( t.indexOf( 'oronasální komunikace' ) ) t = t.replaceAll( ' oronasální komunikace' , 'oronasální komunikace' ).replaceAll( 'oronasální komunikace' , 'oronasální komunikace' ).replaceAll( 'oronasální komunikace' , 'oronasální komunikace' );
			if ( t.indexOf( 'periodoncium' ) ) t = t.replaceAll( 'periodoncium ' , 'periodoncium' ).replaceAll( 'periodoncium' , 'periodoncium' ).replaceAll( 'periodoncium' , 'periodoncium' );
			if ( t.indexOf( 'periostitida' ) ) t = t.replaceAll( ' periostitida' , 'periostitida' ).replaceAll( 'periostitida' , 'periostitida' ).replaceAll( 'periostitida' , 'periostitida' );
			if ( t.indexOf( 'pulpitida' ) ) t = t.replaceAll( 'pulpitida' , 'pulpitida' ).replaceAll( 'pulpitida' , 'pulpitida' ).replaceAll( 'pulpitida' , 'pulpitida ' );
			if ( t.indexOf( 'skloionomerní cement' ) ) t = t.replaceAll( 'skloionomerní cement' , 'skloionomerní cement' ).replaceAll( 'skloionomerní cement' , 'skloionomerní cement' ).replaceAll( 'skloionomerní cement' , 'skloionomerní cement' );
			if ( t.indexOf( 'sutura' ) ) t = t.replaceAll( 'sutura' , 'sutura' ).replaceAll( 'sutura' , 'sutura' ).replaceAll( 'sutura' , 'sutura' );
			if ( t.indexOf( 'temporomandibulární kloub' ) ) t = t.replaceAll( 'temporomandibulární kloub' , 'temporomandibulární kloub' ).replaceAll( 'temporomandibulární kloub' , 'temporomandibulární kloub' ).replaceAll( 'temporomandibulární kloub' , 'temporomandibulární kloub' );
			// punctuation is followed by a capital letter
			t = t.replace(/([.!?]\s+)([a-záčďéěíňóřšťúůýž])/gi, function(match, p1, p2) {
				return p1 + p2.toUpperCase();
			});
		}
		understand( t );
	};
}

function understand(msg) {
	if ( IS_user == 1 ) console.log(msg);
	var editorRecDiv = $( "#" + editorRecDivID );
	var contText = editorRecDiv.summernote( 'code' );
	if ( contText.indexOf( 'recText' + editorTextId ) === -1 ) {
		editorRecDiv.summernote('editor.saveRange');
		editorRecDiv.summernote('editor.restoreRange');
		editorRecDiv.summernote('editor.focus');
		editorRecDiv.summernote('pasteHTML', '<span id="recText' + editorTextId + '">' + msg + '</span>');
	} else {
		var startSel = contText.indexOf( 'id="recText' + editorTextId ) + ( 'id="recText' + editorTextId ).length + 2;
		var endSel = contText.indexOf( "</span>" , startSel );
		contText = contText.substr( 0 , startSel ) + msg + contText.substr( endSel );
		editorRecDiv.summernote('code' , contText);
		editorRecDiv.summernote('editor.focus');
	}
}

function voiceRecStart( target , is_edit ) {
	editorRecOnAir = true;
	editorRecDivID = target;
	editorTextId = Math.floor( Math.random() * 99999 );
	editorRecDiv = document.querySelector( "#voiceRec-" + target + " .note-editable"); 
	editorRecDivSel = window.getSelection();
	editorRecDivRange = editorRecDivSel.getRangeAt(0);
	editorRecDivPos = editorRecDivRange.startOffset;
	recognition.start();
}

function voiceRecStop( target , is_edit ) {
	recognition.stop();
	setTimeout( function() {
		editorTextId = '';
		editorRecOnAir = false;
	} , 1000 );
}

function initVoiceRec() {
	voiceRecInit();

	$("TEXTAREA.voicerec").each( function() {
		var id = $(this).attr( 'id' );
		if ( IS_user == 1 ) console.log('rec-init',id);
		if ( $(this).parent().find("#btn_" + id + '-voicerec').length == 0) {
			$(this).after( '<a href="javascript:;" id="btn_' + id + '-voicerec" data-target="' + id + '" data-iseditor="' + ( $(this).hasClass( 'html-editor' ) ? '1' : '0' ) + '" data-state="0" class="voiceRecorder text-blue"><i class="fa fa-microphone fa-lg"></i></a>' );
			$(this).parent().addClass('has-voicerec');
			$(this).parent().find(".note-editor").attr("id","voiceRec-"+id);
		}
		$(document).on( 'click' , '#btn_' + id + '-voicerec' , function() {
			var state = $(this).attr('data-state');
			var target = $(this).attr('data-target');
			var isedit = parseInt( $(this).attr('data-iseditor') ) == 1;
			if ( IS_user == 1 ) console.log('rec',state);
			if ( state == '0' ) {
				$(this).find('i.fa').removeClass('fa-microphone').addClass('fa-microphone-slash');
				$(this).removeClass('text-blue').addClass('text-red');
				$(this).attr('data-state',1);

				voiceRecStart( target , isedit );
			} else {
				$(this).find('i.fa').removeClass('fa-microphone-slash').addClass('fa-microphone');
				$(this).removeClass('text-red').addClass('text-blue');
				$(this).attr('data-state',0);
				
				voiceRecStop( target , isedit );
			}
		});
	});
}

$(window).load( function() {
	if ( $("TEXTAREA.voicerec").length > 0 ) initVoiceRec();
});
