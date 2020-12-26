<h2 style="text-align: center;"><span style="font-weight: normal;">Sopplayer Integration - HTML5 Stylish Video
    Player</span></h2>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container"
  style="margin-left: auto; margin-right: auto;">
  <tbody>
    <tr>
      <td style="text-align: center;"><a
          href="https://1.bp.blogspot.com/-MXdsGGbh59A/X-cM2B2eQ6I/AAAAAAAAAZU/KLEP-6BI85gMXR-7NjBWIdxnCKyIaNzbACLcBGAsYHQ/s845/sopplayer.JPG"
          style="margin-left: auto; margin-right: auto;"><img border="0" data-original-height="477"
            data-original-width="845" height="361"
            src="https://1.bp.blogspot.com/-MXdsGGbh59A/X-cM2B2eQ6I/AAAAAAAAAZU/KLEP-6BI85gMXR-7NjBWIdxnCKyIaNzbACLcBGAsYHQ/w640-h361/sopplayer.JPG"
            width="640" /></a></td>
    </tr>
    <tr>
      <td class="tr-caption" style="text-align: center;">Sopplayer Screenshot</td>
    </tr>
  </tbody>
</table><br />
<div>Steps :-&nbsp;</div>
<div><br /></div>
<div>&nbsp;<span>&nbsp;&nbsp; </span>1. Use&nbsp;<span
    style="color: #9cdcfe; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">class</span><span
    style="background-color: white; color: #d4d4d4; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">=</span><span
    style="color: #ce9178; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">"sopplayer"
  </span>in Your &lt;video&gt; Tag .</div>
<div><span>&nbsp;&nbsp; &nbsp;</span>2. And Add&nbsp;<span
    style="color: #9cdcfe; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">data-setup</span><span
    style="background-color: white; color: #d4d4d4; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">=</span><span
    style="color: #ce9178; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">"{}"</span>,
  attribute like this .</div>
<div><br /></div>
<div><br /></div>
<div><br /></div>
<div>
  <div class="block section ng-scope" data-pos="1" ng-if="is_sidebar === undefined || is_sidebar == !!section.sidebar"
    ng-repeat="(k, section) in sections"
    style="box-sizing: border-box; color: #474a54; font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; margin-bottom: 20px; position: relative;">
    <div ng-switch="section.type" style="box-sizing: border-box;">
      <div class="ng-scope" ng-switch-when="code" style="box-sizing: border-box;">
        <div class="block-code block-show-code ng-isolate-scope ng-valid" ng-model="section.data"
          style="border-radius: 3px; box-sizing: border-box; margin-bottom: 20px; padding: 3px;" type="section.type">
          <div class="code-tabs"
            style="background-color: white; box-sizing: border-box; margin-top: -1px; position: relative; z-index: 10;">
            <div class="ng-scope tab on" ng-class="{tab: true, on:$index==current, off:$index!=current}"
              ng-repeat="tab in data.codes track by $id($index)"
              style="box-sizing: border-box; color: #bbbbbb; display: inline-block; font-size: 13px;"><span
                class="ng-binding ng-scope" ng-if="!tab.status"
                style="box-sizing: border-box; color: #ce2025; display: inline-block; font-weight: 700; padding: 2px 5px 5px;">HERE
                IS THE FULL VIDEO CODE</span></div>
          </div>
          <div class="ng-scope" ng-repeat="tab in data.codes track by $id($index)" ng-show="$index==current"
            style="box-sizing: border-box;">
            <pre class="cm-s-neo" data-mode="html" ng-if="data.codes[$index].code != &quot;&quot;"
              style="border-radius: 4px; border: 1px solid rgb(204, 204, 204); box-shadow: rgb(238, 238, 238) 0px 0px 0px 3px; box-sizing: border-box; color: #4d4d4c; font-family: Monaco, Menlo, Consolas, &quot;courier new&quot;, monospace; font-size: 12px; line-height: 1.42857; margin-bottom: 0px; margin-top: 0px; overflow-wrap: break-word; overflow: auto; padding: 10px; white-space: pre-wrap; word-break: break-all;"><div style="color: #d4d4d4; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div style="line-height: 19px;"><div><br /></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">video</span>&nbsp;<span style="color: #9cdcfe;">id</span>=<span style="color: #ce9178;">"my-video"</span>&nbsp;<span style="color: #9cdcfe;">class</span>=<span style="color: #ce9178;">"sopplayer"</span>&nbsp;<span style="color: #9cdcfe;">controls</span>&nbsp;<span style="color: #9cdcfe;">preload</span>=<span style="color: #ce9178;">"auto"</span>&nbsp;<span style="color: #9cdcfe;">data-setup</span>=<span style="color: #ce9178;">"{}"</span>&nbsp;<span style="color: #9cdcfe;">width</span>=<span style="color: #ce9178;">"500px"</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #6a9955;">&lt;!--Use&nbsp;class="sopplayer"&nbsp;and&nbsp;data-setup="{}"&nbsp;--&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">source</span>&nbsp;<span style="color: #9cdcfe;">src</span>=<span style="color: #ce9178;">"sample.mp4"</span>&nbsp;<span style="color: #9cdcfe;">type</span>=<span style="color: #ce9178;">"video/mp4"</span>&nbsp;<span style="color: grey;">/&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;/</span><span style="color: #569cd6;">video</span><span style="color: grey;">&gt;</span></span></div></div></div></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p><br /></p>
  <p>3. Add the Css CDN before&nbsp;<span
      style="color: grey; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">&lt;/</span><span
      style="color: #569cd6; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">head</span><span
      style="color: grey; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">&gt;</span>&nbsp;Tag
    .</p>
  <p><br /></p>
  <div class="block section ng-scope" data-pos="1" ng-if="is_sidebar === undefined || is_sidebar == !!section.sidebar"
    ng-repeat="(k, section) in sections"
    style="box-sizing: border-box; color: #474a54; font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; margin-bottom: 20px; position: relative;">
    <div ng-switch="section.type" style="box-sizing: border-box;">
      <div class="ng-scope" ng-switch-when="code" style="box-sizing: border-box;">
        <div class="block-code block-show-code ng-isolate-scope ng-valid" ng-model="section.data"
          style="border-radius: 3px; box-sizing: border-box; margin-bottom: 20px; padding: 3px;" type="section.type">
          <div class="code-tabs"
            style="background-color: white; box-sizing: border-box; margin-top: -1px; position: relative; z-index: 10;">
            <div class="ng-scope tab on" ng-class="{tab: true, on:$index==current, off:$index!=current}"
              ng-repeat="tab in data.codes track by $id($index)"
              style="box-sizing: border-box; color: #bbbbbb; display: inline-block; font-size: 13px;"><span
                class="ng-binding ng-scope" ng-if="!tab.status"
                style="box-sizing: border-box; color: #ce2025; display: inline-block; font-weight: 700; padding: 2px 5px 5px;">HERE
                IS THE CSS CDN</span></div>
          </div>
          <div class="ng-scope" ng-repeat="tab in data.codes track by $id($index)" ng-show="$index==current"
            style="box-sizing: border-box;">
            <pre class="cm-s-neo" data-mode="html" ng-if="data.codes[$index].code != &quot;&quot;"
              style="border-radius: 4px; border: 1px solid rgb(204, 204, 204); box-shadow: rgb(238, 238, 238) 0px 0px 0px 3px; box-sizing: border-box; color: #4d4d4c; font-family: Monaco, Menlo, Consolas, &quot;courier new&quot;, monospace; font-size: 12px; line-height: 1.42857; margin-bottom: 0px; margin-top: 0px; overflow-wrap: break-word; overflow: auto; padding: 10px; white-space: pre-wrap; word-break: break-all;"><div style="color: #d4d4d4; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div style="line-height: 19px;"><div><span style="background-color: white;">&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">link</span>&nbsp;<span style="color: #9cdcfe;">href</span>=<span style="color: #ce9178;">"https://cdn.jsdelivr.net/gh/sh20raj/sopplayer@latest/sopplayer.min.js"</span>&nbsp;<span style="color: #9cdcfe;">rel</span>=<span style="color: #ce9178;">"stylesheet"</span>&nbsp;<span style="color: grey;">/&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;<span style="color: #6a9955;">&lt;!--Here&nbsp;is&nbsp;the&nbsp;Css&nbsp;Library--&gt;</span></span></div></div></div></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p><br /></p>
</div>
<div>
  <p>4. Add the Javascript CDN before&nbsp;<span
      style="color: grey; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">&lt;/</span><span
      style="color: #569cd6; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">body</span><span
      style="color: grey; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; white-space: pre;">&gt;</span>&nbsp;Tag
  </p>
  <p><br /></p>
  <div class="block section ng-scope" data-pos="1" ng-if="is_sidebar === undefined || is_sidebar == !!section.sidebar"
    ng-repeat="(k, section) in sections"
    style="box-sizing: border-box; color: #474a54; font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; margin-bottom: 20px; position: relative;">
    <div ng-switch="section.type" style="box-sizing: border-box;">
      <div class="ng-scope" ng-switch-when="code" style="box-sizing: border-box;">
        <div class="block-code block-show-code ng-isolate-scope ng-valid" ng-model="section.data"
          style="border-radius: 3px; box-sizing: border-box; margin-bottom: 20px; padding: 3px;" type="section.type">
          <div class="code-tabs"
            style="background-color: white; box-sizing: border-box; margin-top: -1px; position: relative; z-index: 10;">
            <div class="ng-scope tab on" ng-class="{tab: true, on:$index==current, off:$index!=current}"
              ng-repeat="tab in data.codes track by $id($index)"
              style="box-sizing: border-box; color: #bbbbbb; display: inline-block; font-size: 13px;"><span
                class="ng-binding ng-scope" ng-if="!tab.status"
                style="box-sizing: border-box; color: #ce2025; display: inline-block; font-weight: 700; padding: 2px 5px 5px;">HERE
                IS THE CSS CDN</span></div>
          </div>
          <div class="ng-scope" ng-repeat="tab in data.codes track by $id($index)" ng-show="$index==current"
            style="box-sizing: border-box;">
            <pre class="cm-s-neo" data-mode="html" ng-if="data.codes[$index].code != &quot;&quot;"
              style="border-radius: 4px; border: 1px solid rgb(204, 204, 204); box-shadow: rgb(238, 238, 238) 0px 0px 0px 3px; box-sizing: border-box; color: #4d4d4c; font-family: Monaco, Menlo, Consolas, &quot;courier new&quot;, monospace; font-size: 12px; line-height: 1.42857; margin-bottom: 0px; margin-top: 0px; overflow-wrap: break-word; overflow: auto; padding: 10px; white-space: pre-wrap; word-break: break-all;"><div style="color: #d4d4d4; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div style="line-height: 19px;"><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">script</span>&nbsp;<span style="color: #9cdcfe;">src</span>=<span style="color: #ce9178;">"https://cdn.jsdelivr.net/gh/sh20raj/sopplayer@latest/sopplayer.min.css"</span><span style="color: grey;">&gt;&lt;/</span><span style="color: #569cd6;">script</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #6a9955;">&lt;!--Here&nbsp;is&nbsp;the&nbsp;JavaScript&nbsp;Library--&gt;</span></span></div></div></div></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p>Here you have completed your Sopplayer Intgretion.&nbsp;</p>
  <p><br /></p>
  <h3 style="text-align: center;">Before Sopplayer</h3>
</div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container"
  style="margin-left: auto; margin-right: auto;">
  <tbody>
    <tr>
      <td style="text-align: center;"><a
          href="https://1.bp.blogspot.com/-pPXCh0HvCP4/X-cPV_H9i5I/AAAAAAAAAZg/dW7vPwvafR44FdtYowtEaT66Vz8ZfaPnACLcBGAsYHQ/s501/before.JPG"
          style="margin-left: auto; margin-right: auto;"><img border="0" data-original-height="285"
            data-original-width="501" height="228"
            src="https://1.bp.blogspot.com/-pPXCh0HvCP4/X-cPV_H9i5I/AAAAAAAAAZg/dW7vPwvafR44FdtYowtEaT66Vz8ZfaPnACLcBGAsYHQ/w400-h228/before.JPG"
            width="400" /></a></td>
    </tr>
    <tr>
      <td class="tr-caption" style="text-align: center;">Before Sopplayer</td>
    </tr>
  </tbody>
</table>
<div class="separator" style="clear: both; text-align: center;"><br /></div>
<div class="separator" style="clear: both; text-align: center;"><b>After Sopplayer</b></div>
<div class="separator" style="clear: both; text-align: center;"><b><br /></b></div>
<div class="separator" style="clear: both; text-align: center;">
  <table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container"
    style="margin-left: auto; margin-right: auto;">
    <tbody>
      <tr>
        <td style="text-align: center;"><a
            href="https://1.bp.blogspot.com/-5VKxy1NHI4s/X-cPXCnksqI/AAAAAAAAAZk/xh-pu7yVskklt1a5FB6yzEPUU_sOXDrfACPcBGAYYCw/s614/after.JPG"
            style="margin-left: auto; margin-right: auto;"><img border="0" data-original-height="345"
              data-original-width="614" height="225"
              src="https://1.bp.blogspot.com/-5VKxy1NHI4s/X-cPXCnksqI/AAAAAAAAAZk/xh-pu7yVskklt1a5FB6yzEPUU_sOXDrfACPcBGAYYCw/w400-h225/after.JPG"
              width="400" /></a></td>
      </tr>
      <tr>
        <td class="tr-caption" style="text-align: center;">After Sopplayer</td>
      </tr>
    </tbody>
  </table><br /><b><br /></b>
</div><br />
<div><br /></div>
<p></p>
<div class="block section ng-scope" data-pos="2" ng-if="is_sidebar === undefined || is_sidebar == !!section.sidebar"
  ng-repeat="(k, section) in sections"
  style="-webkit-text-stroke-width: 0px; background-color: white; box-sizing: border-box; color: #474a54; font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-caps: normal; font-variant-ligatures: normal; font-weight: 400; letter-spacing: normal; margin-bottom: 20px; orphans: 2; position: relative; text-align: start; text-decoration-color: initial; text-decoration-style: initial; text-decoration-thickness: initial; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;">
  <div ng-switch="section.type" style="box-sizing: border-box;">
    <div class="ng-scope" ng-switch-when="textarea" style="box-sizing: border-box;">
      <div class="ng-isolate-scope" marked="section.text" style="box-sizing: border-box;"></div>
    </div>
  </div>
</div>
<p></p>
<div class="block section ng-scope" data-pos="1" ng-if="is_sidebar === undefined || is_sidebar == !!section.sidebar"
  ng-repeat="(k, section) in sections"
  style="-webkit-text-stroke-width: 0px; box-sizing: border-box; color: #474a54; font-family: &quot;Open Sans&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-caps: normal; font-variant-ligatures: normal; font-weight: 400; letter-spacing: normal; margin-bottom: 20px; orphans: 2; position: relative; text-align: start; text-decoration-color: initial; text-decoration-style: initial; text-decoration-thickness: initial; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;">
  <div ng-switch="section.type" style="box-sizing: border-box;">
    <div class="ng-scope" ng-switch-when="code" style="box-sizing: border-box;">
      <div class="block-code block-show-code ng-isolate-scope ng-valid" ng-model="section.data"
        style="border-radius: 3px; box-sizing: border-box; margin-bottom: 20px; padding: 3px;" type="section.type">
        <div class="code-tabs"
          style="background-color: white; box-sizing: border-box; margin-top: -1px; position: relative; z-index: 10;">
          <div class="ng-scope tab on" ng-class="{tab: true, on:$index==current, off:$index!=current}"
            ng-repeat="tab in data.codes track by $id($index)"
            style="box-sizing: border-box; color: #bbbbbb; display: inline-block; font-size: 13px;"><span
              class="ng-binding ng-scope" ng-if="!tab.status"
              style="box-sizing: border-box; color: #ce2025; display: inline-block; font-weight: 700; padding: 2px 5px 5px; text-decoration: none;">SEE
              HOW FULL HTML WILL LOOK LIKE</span></div>
        </div>
        <div class="ng-scope" ng-repeat="tab in data.codes track by $id($index)" ng-show="$index==current"
          style="box-sizing: border-box;">
          <pre class="cm-s-neo" data-mode="html" ng-if="data.codes[$index].code != &quot;&quot;"
            style="border-radius: 4px; border: 1px solid rgb(204, 204, 204); box-shadow: rgb(238, 238, 238) 0px 0px 0px 3px; box-sizing: border-box; color: #4d4d4c; display: block; font-family: Monaco, Menlo, Consolas, &quot;courier new&quot;, monospace; font-size: 12px; line-height: 1.42857; margin: 0px; overflow-wrap: break-word; overflow: auto; padding: 10px; white-space: pre-wrap; word-break: break-all;"><div style="color: #d4d4d4; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;"><div><div style="line-height: 19px;"><div><span style="background-color: white;"><span style="color: grey;">&lt;!</span><span style="color: #569cd6;">DOCTYPE</span>&nbsp;<span style="color: #9cdcfe;">html</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;"><span style="color: grey;">&lt;</span><span style="color: #569cd6;">html</span>&nbsp;<span style="color: #9cdcfe;">lang</span>=<span style="color: #ce9178;">"en"</span><span style="color: grey;">&gt;</span></span></div><span style="background-color: white;"><br /></span><div><span style="background-color: white;"><span style="color: grey;">&lt;</span><span style="color: #569cd6;">head</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">meta</span>&nbsp;<span style="color: #9cdcfe;">charset</span>=<span style="color: #ce9178;">"UTF-8"</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">meta</span>&nbsp;<span style="color: #9cdcfe;">name</span>=<span style="color: #ce9178;">"viewport"</span>&nbsp;<span style="color: #9cdcfe;">content</span>=<span style="color: #ce9178;">"width=device-width,&nbsp;initial-scale=1.0"</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">link</span>&nbsp;<span style="color: #9cdcfe;">href</span>=<span style="color: #ce9178;">"https://cdn.jsdelivr.net/gh/sh20raj/sopplayer@latest/sopplayer.min.css"</span>&nbsp;<span style="color: #9cdcfe;">rel</span>=<span style="color: #ce9178;">"stylesheet"</span>&nbsp;<span style="color: grey;">/&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;<span style="color: #6a9955;">&lt;!--Here&nbsp;is&nbsp;the&nbsp;Css&nbsp;Library--&gt;</span></span></div><div><span style="background-color: white;"><span style="color: grey;">&lt;/</span><span style="color: #569cd6;">head</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;"><span style="color: grey;">&lt;</span><span style="color: #f44747;">center</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">body</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">video</span>&nbsp;<span style="color: #9cdcfe;">id</span>=<span style="color: #ce9178;">"my-video"</span>&nbsp;<span style="color: #9cdcfe;">class</span>=<span style="color: #ce9178;">"sopplayer"</span>&nbsp;<span style="color: #9cdcfe;">controls</span>&nbsp;<span style="color: #9cdcfe;">preload</span>=<span style="color: #ce9178;">"auto"</span>&nbsp;<span style="color: #9cdcfe;">data-setup</span>=<span style="color: #ce9178;">"{}"</span>&nbsp;<span style="color: #9cdcfe;">width</span>=<span style="color: #ce9178;">"500px"</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #6a9955;">&lt;!--Use&nbsp;class="sopplayer"&nbsp;and&nbsp;data-setup="{}"&nbsp;--&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">source</span>&nbsp;<span style="color: #9cdcfe;">src</span>=<span style="color: #ce9178;">"sample.mp4"</span>&nbsp;<span style="color: #9cdcfe;">type</span>=<span style="color: #ce9178;">"video/mp4"</span>&nbsp;<span style="color: grey;">/&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;/</span><span style="color: #569cd6;">video</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: grey;">&lt;</span><span style="color: #569cd6;">script</span>&nbsp;<span style="color: #9cdcfe;">src</span>=<span style="color: #ce9178;">"https://cdn.jsdelivr.net/gh/sh20raj/sopplayer@latest/sopplayer.min.js"</span><span style="color: grey;">&gt;&lt;/</span><span style="color: #569cd6;">script</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #6a9955;">&lt;!--Here&nbsp;is&nbsp;the&nbsp;JavaScript&nbsp;Library--&gt;</span></span></div><div><span style="background-color: white;"><span style="color: grey;">&lt;/</span><span style="color: #f44747;">center</span><span style="color: grey;">&gt;</span></span></div><div><span style="background-color: white;"><span style="color: grey;">&lt;/</span><span style="color: #569cd6;">body</span><span style="color: grey;">&gt;</span></span></div><span style="background-color: white;"><br /></span><div><span style="background-color: white;"><span style="color: grey;">&lt;/</span><span style="color: #569cd6;">html</span><span style="color: grey;">&gt;</span></span></div></div></div></div></pre>
        </div>
      </div>
    </div>
  </div>
</div>
<p>&nbsp;</p>
