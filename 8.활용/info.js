/*
    1) 화면 요소 가져오기
       
       상품을 적는 입력칸
*/
       const nameInput = document.getElementById("nameInput");

/*     가격을 적는 입력칸    */
       const priceInput = document.getElementById("priceInput");

/*     등록 버튼             */
       const addBtn = document.getElementById("addBtn");

/*     상품을 검색하는 입력칸    */
       const searchInput = document.getElementById("searchInput");

/*     정렬 방식을 고르는 드롭다운   */
       const sortSelect = document.getElementById("sortSelect");

/*     상품 목록이 들어갈 표의 본문 (tbody)  */
       const table =document.getElementById("table");

/*     총합 금액을 보여주는 글자 영역       */ 
       const total = document.getElementById("total");

/*
    2) 상품을 저장할 비어있는 배열 생성
*/
let products = [];

/*
    3) 상품 등록 : 버튼 클릭시 실행되는 로직
    - 입력 검증 : 값이 비었거나 가격이 숫자가 아닌 경우 경고
    - 상품 객체를 만들고 배열(products)에 추가
    - 입력창을 비우고 전체 HTML을 다시 브라우저가 읽어들이게 하자.
*/
addBtn.addEventListener("click", () => {

    //1> 사용자가 입력칸에 적은 값을 꺼내옵니다.
    const name = nameInput.Value.trim(); //입력한 상품명
    const price = Number(priceInput.Value); //입력한 가격을 숫자로 변환해서 저장

    //2> 잘못 입력했는지 검사합니다. (하나라도 이상하면 등록을 멈춤)
    // !name -> 이름이 비어 있으면 true
    // !price -> 가격이 0, 빈칸, 숫자가 아님(NaN) 이면 true
    if(!name || !price){

        alert("상품명과 가격을 올바르게 입력하세요"); //화면에 경고 메세지 팝업
        return; //() => 함수 즉시 종료

    }

    //3> 이 상품만의 고유번호(id)를 만듭니다.
    //   Date.now()    = 지금 시각을 아주 큰 숫자(밀리초)로 알려줌 -> 매번 값이 달라져서 거의 겹쳐지지 않음
    //   Math.random() = 0.0 ~ 0.1 사이의 무작위 실수를 반환 -> 만에 하나 겹치는 것을 방지
    //   두 값을 더해 "겹치지 않는 번호"를 만듭니다.
    const id = Date.now() + Math.random();

    //4> 위에서 모은 값들을 상품 객체 하나를 만들어 products 빈 대열에 추가
    //방법 push(추가할 상품정보의 객체) <- 배열 맨 뒤에 새 항목을 추가
    products.push({id:id, name:name, price:price} );

    //5> 다음 상품을 편하게 입력하도록 입력칸을 비웁니다. (빈 문자열 ""로 넣는다.)
    nameInput.Value = "";       priceInput.value = "";

    //6> 화면을 다시 그립니다.
    //   products 배열의 데이터가 바뀌었으니, 그 내용에 맞춰 표와 총합을 새로 그려주는 render() 호출
    reder();

});

/*
    7) render() 함수
      - 역할 : 현재 products 배열 상태에 맞춰 화면(테이블)과 총합을 다시 그리는 함수
      - 동장순서 요약:
      1) 테이블 초기화
      2) 검색어로 products 배열에서 꺼내서 보여줄 목록을 고름(filter)
      3) 정렬을 적용(sort)
      4) 화면에 행 하나씩 추가
      5) 각 행의 삭제 버튼에 이벤트 연결(id기반 삭제)
      6) 총합을 계산해 화면에 갱신
*/ 
function render(){
    //1> 테이블 표안<tbody></tbody>의 기존 내용을 전부 지웁니다.
    table.innerHTML = "";
    //2> 검색칸에 입력된 검색어를 읽어옵니다.
    const keyword = searchInput.value.trim().toLowerCase();

    //3> 전체 상품 중 '검색어가 이름에 포함된 상품'만 골라 보여줄 목록을 만듭니다.
    //[ {id:1, name:"빼빼로", price:1000} , {id:2, name:"사과", price:500}  ] <-  products 배열

    //  includes("사과") = 문자열 안에 "사과"가 들어 있으면 true
    //  검색칸이 비어 있으면 keyword가 ""이고, 모든 이름이 ""를 포함하므로 전체가 보입니다.
    let displatList = products.filter(function(item){

        return item.name.toLowerCase().includes(keyword)

    });
    
    //만약 사용자가 "가격 낮은순"(asc) 을 선택한 경우
    if(sortSelect.value === "asc"){

        displayList.soft( (a,b) => a.price - b.price );

    }else if(sortSelect.value === "desc"){//사용자가 "가격 높은순(desc)을 선택한 경우"

    }

}