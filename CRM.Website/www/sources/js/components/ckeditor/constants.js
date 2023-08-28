export const TOOLBAR = [
    { name: 'document', items: ['Source'] },
    { name: 'colors', items: ['TextColor', 'BGColor'] },
    { name: 'basic styles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
    { name: 'links', items: ['Link', 'Unlink'] },
    { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
    { name: 'insert', items: ['Image', 'HorizontalRule'] },
    { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo'] },
    { name: 'editblock', items: ['EditBlock'] }
];

export const REMOVE_PLUGINS = 'magicline, elementspath, image, tabletools, liststyle, tableselection';

export const EXTRA_TOOLBAR = "justify, font, colorbutton, colordialog, image2, uploadimage, editblock, language";

export const EDIT_BLOCK_TEMPLATE = `<div>
    <div style="background-color: #FFFFD0; padding-left: 10px; border-left: 1px solid #CCCCCC;">
        <div style="font-size: 9px; color:#105289">by <span style="color: #105289; font-weight: bold; font-size: 11px;">{0}</span> on {1}</div>
        <div style="border-top: 1px solid #CCCCCC; padding: 5px 0pt 0pt;">{2}</div>
    </div>
    </div>
<br>`;