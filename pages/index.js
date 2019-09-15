require('./index.pug');
require('jquery');
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');
//require('webpack-jquery-ui/selectmenu');
require('../Common.blocks/Fonts/Fonts.scss');

/*Library.blocks*/

require('../Library.blocks/JqueryMultiselectPlugin/JqueryMultiselectPlugin.css');
require('../Library.blocks/JqueryMultiselectPlugin/JqueryMultiselectPlugin.js');
require('../Library.blocks/AirDatepicker/AirDatepicker.css');
require('../Library.blocks/AirDatepicker/AirDatepicker.js');

/*End Library.blocks*/


require('./index.scss');

/*Common.blocks*/

require('../Common.blocks/Content/Content.js');
require('../Common.blocks/Content/-WrapperForFormElements/Content-WrapperForFormElements.js');
require('../Common.blocks/Content/-Wrapper/Content-Wrapper.js');

require('../Common.blocks/Logo/Logo.js');
require('../Common.blocks/LogoWrapper/LogoWrapper.js');

require('../Common.blocks/Container/Container.js');
require('../Common.blocks/Container/_bgColor/Container_bgColor_white.js');
require('../Common.blocks/Container/_height/Container_height_1853px.js');
require('../Common.blocks/Container/_marBot/Container_marBot_50px.js');

require('../Common.blocks/FigureHtml5/-FigcaptionWrapper/FigureHtml5-FigcaptionWrapper.js');
require('../Common.blocks/FigureHtml5/-Figcaption/FigureHtml5-Figcaption.js');
require('../Common.blocks/FigureHtml5/-Image/FigureHtml5-Image.js');
require('../Common.blocks/FigureHtml5/FigureHtml5.js');
require('../Common.blocks/FigureHtml5/_bg/FigureHtml5_bg_dsh05.js');
require('../Common.blocks/FigureHtml5/_bg/FigureHtml5_bg_dsh100.js');
require('../Common.blocks/FigureHtml5/_bg/FigureHtml5_bg_dsh25.js');
require('../Common.blocks/FigureHtml5/_bg/FigureHtml5_bg_dsh50.js');
require('../Common.blocks/FigureHtml5/_bg/FigureHtml5_bg_dsh75.js');
require('../Common.blocks/FigureHtml5/_bg/FigureHtml5_bg_green.js');
require('../Common.blocks/FigureHtml5/_bg/FigureHtml5_bg_purple.js');
require('../Common.blocks/FigureHtml5/_ff/FigureHtml5_ff_quicksandRegular.js');
require('../Common.blocks/FigureHtml5/_marginTop/FigureHtml5_marginTop.js');
require('../Common.blocks/FigureHtml5/_pdB/FigureHtml5_pdB_20px.js');
require('../Common.blocks/FigureHtml5/_pdTop/FigureHtml5_pdTop.js');
require('../Common.blocks/FigureHtml5/_pdTop/FigureHtml5_pdTop_correct.js');

require('../Common.blocks/ExampleText/-Wrapper/ExampleText-Wrapper.js');
require('../Common.blocks/ExampleText/-Text/ExampleText-Text.js');
require('../Common.blocks/ExampleText/-Header/ExampleText-Header.js');
require('../Common.blocks/ExampleText/ExampleText.js');
require('../Common.blocks/ExampleText/_fontSize/ExampleText_fontSize_12px.js');
require('../Common.blocks/ExampleText/_fontSize/ExampleText_fontSize_14px.js');
require('../Common.blocks/ExampleText/_fontSize/ExampleText_fontSize_19px.js');
require('../Common.blocks/ExampleText/_fontSize/ExampleText_fontSize_24px.js');
require('../Common.blocks/ExampleText/_fontStyle/ExampleText_fontStyle_body.js');
require('../Common.blocks/ExampleText/_fontStyle/ExampleText_fontStyle_h1.js');
require('../Common.blocks/ExampleText/_fontStyle/ExampleText_fontStyle_h2.js');
require('../Common.blocks/ExampleText/_fontStyle/ExampleText_fontStyle_h3.js');
require('../Common.blocks/ExampleText/_lineH/ExampleText_lineH_15.js');
require('../Common.blocks/ExampleText/_lineH/ExampleText_lineH_23.js');
require('../Common.blocks/ExampleText/_lineH/ExampleText_lineH_24.js');
require('../Common.blocks/ExampleText/_lineH/ExampleText_lineH_29.js');
require('../Common.blocks/ExampleText/_pdBot/ExampleText_pdBot_correct.js');
require('../Common.blocks/ExampleText/_pdR/ExampleText_pdR_34.js');
require('../Common.blocks/ExampleText/_textTransf/ExampleText_textTransf_upper.js');
require('../Common.blocks/ExampleText/_width/ExampleText_width_316px.js');

require('../Common.blocks/InputBlock/-Dropdown/InputBlock-Dropdown.js');
require('../Common.blocks/InputBlock/-WrapperForSelectWithArrow/InputBlock-WrapperForSelectWithArrow.js');
require('../Common.blocks/InputBlock/-SelectArrow/InputBlock-SelectArrow.js');
require('../Common.blocks/InputBlock/-Option/InputBlock-Option.js');
require('../Common.blocks/InputBlock/-Select/InputBlock-Select.js');
require('../Common.blocks/InputBlock/-Wrapper/InputBlock-Wrapper.js');
require('../Common.blocks/InputBlock/-FieldName/InputBlock-FieldName.js');
require('../Common.blocks/InputBlock/-FieldDescription/InputBlock-FieldDescription.js');
require('../Common.blocks/InputBlock/-InputField/InputBlock-InputField.js');
require('../Common.blocks/InputBlock/InputBlock.js');
require('../Common.blocks/InputBlock/_appearan/InputBlock_appearan_none.js');
require('../Common.blocks/InputBlock/_brColor/InputBlock_brColor_drSh50.js');
require('../Common.blocks/InputBlock/_color/InputBlock_color_dark25.js');
require('../Common.blocks/InputBlock/_color/InputBlock_color_dark50.js');
require('../Common.blocks/InputBlock/_color/InputBlock_color_dark75.js');
require('../Common.blocks/InputBlock/_expandMore/InputBlock_expandMore.js');
require('../Common.blocks/InputBlock/_letterSpacing/InputBlock_letterSpacing_0px.js');
require('../Common.blocks/InputBlock/_letterSpacing/InputBlock_letterSpacing_02px.js');
require('../Common.blocks/InputBlock/_mrBot/InputBlock_mrBot_19px.js');
require('../Common.blocks/InputBlock/_mrBot/InputBlock_mrBot_21px.js');
require('../Common.blocks/InputBlock/_mrBot/InputBlock_mrBot_37px.js');
require('../Common.blocks/InputBlock/_mrBot/InputBlock_mrBot_39px.js');
require('../Common.blocks/InputBlock/_mrBot/InputBlock_mrBot_97px.js');
require('../Common.blocks/InputBlock/_mrTop/InputBlock_mrTop_5px.js');
require('../Common.blocks/InputBlock/_pdTop/InputBlock_pdTop_11px.js');
require('../Common.blocks/InputBlock/_pdTop/InputBlock_pdTop_2px.js');
require('../Common.blocks/InputBlock/_pdTop/InputBlock_pdTop_3px.js');
require('../Common.blocks/InputBlock/_pdTop/InputBlock_pdTop_4px.js');
require('../Common.blocks/InputBlock/_pdTop/InputBlock_pdTop_5px.js');
require('../Common.blocks/InputBlock/_width/InputBlock_width_150px.js');
require('../Common.blocks/InputBlock/_width/InputBlock_width_265px.js');
require('../Common.blocks/InputBlock/_width/InputBlock_width_266px.js');

require('../Common.blocks/Wrapper/-FormElements/Wrapper-FormElements.js');

require('../Common.blocks/Dropdown/Dropdown.js');
require('../Common.blocks/Dropdown/-Option/Dropdown-Option.js');

require('../Common.blocks/Wrapper/-MasketField/Wrapper-MasketField.js');
require('../Common.blocks/Wrapper/-GuestsDropdown/Wrapper-GuestsDropdown.js');
require('../Common.blocks/Wrapper/-DateDropdown/Wrapper-DateDropdown.js');
require('../Common.blocks/Wrapper/-DateDropdown/Wrapper-DateDropdown.js');
require('../Common.blocks/Wrapper/-FacilitiesDropdown/Wrapper-FacilitiesDropdown.js');

require('../Common.blocks/DropdownGuests/DropdownGuests.js');
require('../Common.blocks/DropdownGuests/-Option/DropdownGuests-Option.js');

require('../Common.blocks/InputBlock/_pdTop/InputBlock_pdTop_1px.js');

require('../Common.blocks/AirDatapicker/AirDatapicker.js');
require('../Common.blocks/DropdownDatepicker/DropdownDatepicker.js');
require('../Common.blocks/DropdownDatepicker/-Icon/DropdownDatepicker-Icon.js');
require('../Common.blocks/_Kit/_Kit.js');
require('../Common.blocks/DropdownDatepicker/-Open/DropdownDatepicker-Open.js');
require('../Common.blocks/DropdownDatepicker/-ArrivalDate/DropdownDatepicker-ArrivalDate.js');
require('../Common.blocks/DropdownDatepicker/-DateOfDeparture/DropdownDatepicker-DateOfDeparture.js');
require('../Common.blocks/DropdownDatepicker/-WrapperForDatepicker/DropdownDatepicker-WrapperForDatepicker.js');
require('../Common.blocks/DropdownDatepicker/-SelectArrivalDate/DropdownDatepicker-SelectArrivalDate.js');
require('../Common.blocks/DropdownDatepicker/-SelectDateOfDeparture/DropdownDatepicker-SelectDateOfDeparture.js');
require('../Common.blocks/DropdownDatepicker/-ApplyButton/DropdownDatepicker-ApplyButton.js');
require('../Common.blocks/DropdownDatepicker/-ResetButton/DropdownDatepicker-ResetButton.js');