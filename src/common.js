function composePage(currentScroll) {
    ROOT = $(OPTIONS.rootElement);
    ROOT.wrapInner('<div id="hrz-container"></div>');
    CONTAINER = $('#hrz-container');
    CONTAINER.width(ROOT.width());
    VIEWPORT_HEIGHT =  $(window).height() - OPTIONS.pageMargin * 2;
    var allNodes = new NodeCollection(OPTIONS.selector);
    PAGE_COLLECTION = allNodes.splitIntoPages();
    PAGE_COLLECTION.renderToDom(currentScroll);
    // remove any DOM nodes that are not included in the selector,
    // since they will just be left floating around in the wrong place.
    CONTAINER.children().not('.hrz-page').filter(':visible').remove();

    var documentHeight = PAGE_COLLECTION.last().bottom / OPTIONS.scrollStep + VIEWPORT_HEIGHT;
    ROOT.height(documentHeight);
    if (!OPTIONS.displayScrollbar) {
        ROOT.css('overflow-y', 'hidden');
    }
    renderPageCount();
}

function renderPageCount() {
    if ($('.hrz-page-count').length === 0) {
        var pageCountDiv = $('<div class="hrz-page-count"></div>');
        $('body').append(pageCountDiv);
        pageCountDiv.append('<span id="hrz-current-page"></span> / <span id="hrz-total-pages"></span>');
        $('#hrz-total-pages').html(PAGE_COLLECTION.length);
        if (!OPTIONS.displayPageCount) {
            pageCountDiv.addClass('hidden');
        }
    }
}

function updatePageCount() {
    $('#hrz-current-page').html(PAGE_COLLECTION.currentPage);
}