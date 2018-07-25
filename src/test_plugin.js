(function( $ ) {
 
    const defaultSettings = {
        maxItems: 5,
        
    }

    let _dataMap = {};
    let _uidList = [];

    function gc() {
        _uidList = _uidList.filter( (uid) => {
            if ( $.contains(window.document, _dataMap[uid].el) )
                return true;
            delete _dataMap[uid];
            return false;
        })
    }

    const lArrowClass = 'l-arrow';
    const rArrowClass = 'r-arrow';
    const slideClass = 'slide';
    const slidesWrapperClass = 's-wrapper';
    const slideList = 's-list';
    const slideScroller = 's-scroller';
    const previewClass = 'preview';
    const previewWrapperClass = 'preview-wrapper';

    const selectedSlideClass = 'selected'
    const ctrlDisabledClass = 'ctrl-disabled';

    function moveSlider(uid, n) {
        _dataMap[uid].offset += parseInt(n);
        const offsetInRem = _dataMap[uid].offset * -21; // should be calc.
        refreshArrows(uid);
        _dataMap[uid].sl.css('transform', `translate3d(${offsetInRem}rem,0,0)`)
    }

    function refreshArrows(uid) {
        const offset = _dataMap[uid].offset;
        (offset < 1)
            ? _dataMap[uid].larrow.addClass(ctrlDisabledClass)
            : _dataMap[uid].larrow.removeClass(ctrlDisabledClass);
        ((offset + _dataMap[uid].settings.maxItems) >= _dataMap[uid].slideUrls.length)
            ? _dataMap[uid].rarrow.addClass(ctrlDisabledClass)
            : _dataMap[uid].rarrow.removeClass(ctrlDisabledClass);
    }

    function selectSlide(uid, el) {
        let sel = _dataMap[uid].sw.find(`.${slideClass}.${selectedSlideClass}`);
        sel.removeClass(selectedSlideClass);
        el.addClass(selectedSlideClass);

        const url = _dataMap[uid].slideUrls[el.attr('data-sid')];
        _dataMap[uid].preview.css('background-image', `url('${url}')`)
        // TODO: switch preview;
    }

    function clickHandler(uid, e) {
        const el = $(e.target);

        if (el.hasClass(lArrowClass))
            return moveSlider(uid, -1);
        if (el.hasClass(rArrowClass))
            return moveSlider(uid, 1);
        
        if (el.hasClass(slideClass))
            return selectSlide(uid, el);
    }

    function init(uid, data) {
        if (Object.hasOwnProperty.call(_dataMap, uid))
            return;

        data.el.append( `<div class="${previewWrapperClass}"></div>` );
        data.el.find(`.${previewWrapperClass}`).append( `<div class="${previewClass}"></div>` );
        data.el.append( `<div class="${slidesWrapperClass}"></div>` );
        const sw = data.el.find(`.${slidesWrapperClass}`);
        sw.append( `<div class="${slideScroller}"></div>` );
        sw.append( `<div class="${lArrowClass}"></div>` );
        sw.append( `<div class="${rArrowClass}"></div>` );
        data.el.find(`.${slideScroller}`).append( `<div class="${slideList}"></div>` );
        
        const ss = sw.find(`.${slideScroller}`);
        const sl = sw.find(`.${slideList}`);        
        data.slideUrls.map( (v, i) => sl.append( `<div class="${slideClass}" data-sid="${i}" style="background-image: url('${v}')">${i}</div>`) );

        sw.on('click', clickHandler.bind(null, uid));
        _dataMap[uid] = {
            ...data,
            sw: sw, sl: sl,
            larrow: sw.find(`.${lArrowClass}`), rarrow: sw.find(`.${rArrowClass}`),
            preview: data.el.find(`.${previewClass}`)
        };
        _uidList.push(uid);
        refreshArrows(uid);
    }


    $.fn.testPlugin = function(slideUrls, settings) {

        console.log(this);
        const uid = 1; // shoud be generated from html element/
        gc();
        init(uid, {
            el: this,
            slideUrls: slideUrls,
            offset: 0,
            settings: { ...defaultSettings, ...settings}
        });
        return this;
    };
 
}( jQuery ));