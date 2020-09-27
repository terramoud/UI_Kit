jQuery(document).ready(function () {
  jQuery('.ToggleButton').each(function () {
    jQuery(this).mSwitch({
      onRendered:function(){

      },
      onRender:function(elem){},
      onTurnOn:function(elem){
        return true;
      },
      onTurnOff:function(elem){
        return true;
      }
    });
      let label = jQuery(this).parent('.m_switch').siblings('.ToggleBlock-Descr').detach();
      jQuery(this).closest('.m_switch').after(label);
  });
});
