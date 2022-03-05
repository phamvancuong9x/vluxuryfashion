//  rb8752e
// hàm ẩn thẻ span trong breackcrumb
function hideSpanBreadcrumbs() {
  $(".breadcrumbs__linkPage-container >span:nth-child(3)").remove();
}
hideSpanBreadcrumbs();
