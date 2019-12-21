jQuery(document).ready(function () {
  jQuery('.ToggleButton-Button').each(function () {
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
    let label = jQuery(this).parent('.m_switch').siblings('.ToggleButton-Label').detach();
    jQuery(this).closest('.m_switch').after(label);
  });
});

