### 영역 설명
- Nav, Header - 공통영역
- content - 작업영역
- 로그인 페이지, 조직도_인사정보 팝업, 조직도_부서관리팝업 (작업중)

### 네이밍 규칙
- 케밥 케이스 (example-class-name)

### html 구조
- 페이지 메인 컨텐츠는 
```
<main>
  <div class=page-wrapper>
    <section>page top</section>
    <section>page bottom</section>
  </div>
</main>
```

### css 규칙
- 페이지별로 나누어 퍼블리싱하므로 html 파일과 동일한 이름의 css 파일로 작업 진행
- 공통 부문 : common.css에서 관리
    + 버튼이나 input 박스는 공통 부분에 명시된 클래스명 추가하여 css 적용
    + h1~h6 common.js ph1~ph2 로 선언되어 있으므로 클래스명 추가하여 사용
- main content의 클래스명부터 나열하여 다른 css의 영향 방지
- example
```
.group-wrapper .group-user .userlist-top .search input {
    border-radius: 10px; border: none; padding-left: 10px;
}
```
