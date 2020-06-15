// 代码块一键复制

$(function () {
  var $copyIcon = $(
    '<i class="fas fa-copy code_copy" title="复制代码" aria-hidden="true"></i>',
  )
  var $notice = $('<div class="codecopy_notice"></div>')
  $('.code-area').prepend($copyIcon)
  $('.code-area').prepend($notice)
  $('.code-area').each((i, el) => {
    const $el = $(el)
    $el.data('code', $el.find('pre').text())
  })
  /**
   * 复制一段文本内容
   * @param text 要进行复制的文本
   * @returns 是否复制成功
   */
  function copyText(text) {
    const $el = document.createElement('textarea')
    $el.style.position = 'fixed'
    $el.style.top = '-1000px'
    document.body.appendChild($el)
    $el.value = text
    $el.select()
    const res = document.execCommand('copy')
    document.body.removeChild($el)
    return res
  }

  // “复制成功”字出现
  function copy(text, ctx) {
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      try {
        copyText(text) // Security exception may be thrown by some browsers.
        $(ctx)
          .prev('.codecopy_notice')
          .text('复制成功')
          .animate(
            {
              opacity: 1,
              top: 30,
            },
            450,
            function () {
              setTimeout(function () {
                $(ctx).prev('.codecopy_notice').animate(
                  {
                    opacity: 0,
                    top: 0,
                  },
                  650,
                )
              }, 400)
            },
          )
      } catch (ex) {
        $(ctx)
          .prev('.codecopy_notice')
          .text('复制失败')
          .animate(
            {
              opacity: 1,
              top: 30,
            },
            650,
            function () {
              setTimeout(function () {
                $(ctx).prev('.codecopy_notice').animate(
                  {
                    opacity: 0,
                    top: 0,
                  },
                  650,
                )
              }, 400)
            },
          )
        return false
      }
    } else {
      $(ctx).prev('.codecopy_notice').text('浏览器不支持复制')
    }
  }

  // 复制
  $('.code-area .fa-copy').on('click', function () {
    const code = $(this).parent().data('code')
    copy(code, this)
  })
})
