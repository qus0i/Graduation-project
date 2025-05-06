document.addEventListener('DOMContentLoaded', function () {
    // Create <style> and append CSS
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #0b0804;
      }
      .library-icon-wrapper {
        width: 60px;
        height: 60px;
        display: inline-block;
        color: #f9c172;
        transition: color 0.3s;
        cursor: pointer;
        border: none;
        background: none;
        padding: 0;
      }
      .library-icon-wrapper:hover {
        color: #c17b36;
      }
      .library-icon-wrapper.active {
        color: #f9c172;
      }
      .library-icon-wrapper.active:hover {
        color: #c17b36;
      }
      .library-icon {
        width: 100%;
        height: 100%;
      }
      .hidden {
        display: none;
      }
    `;
    document.head.appendChild(style);
  
    // Create the button element
    const form = document.createElement('form');
    form.action = '/your-action-url';
    form.method = 'POST';
  
    const button = document.createElement('button');
    button.type = 'button';
    button.name = 'libraryButton';
    button.value = 'submit';
    button.id = 'toggleButton';
    button.className = 'library-icon-wrapper';
  
    // SVG default icon
    const iconDefault = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconDefault.setAttribute('id', 'icon-default');
    iconDefault.setAttribute('class', 'library-icon');
    iconDefault.setAttribute('fill', 'currentColor');
    iconDefault.setAttribute('height', '800px');
    iconDefault.setAttribute('width', '800px');
    iconDefault.setAttribute('viewBox', '0 0 512 512');
    iconDefault.innerHTML = `
      <g transform="translate(1 1)">
        <path d="M186.736 400.064H75.792c-14.512 0 -25.6 -11.088 -25.6 -25.6s11.088 -25.6 25.6 -25.6h196.272c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528H75.792c-23.888 0 -42.672 18.768 -42.672 42.672s18.768 42.672 42.672 42.672h110.928c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
        <path d="M306.192 400.064h-76.8c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h76.8c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
        <path d="M84.336 365.936c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.544 8.528 8.544h51.2c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528z"/>
        <path d="M348.864 255.008H186.736c-5.12 0 -8.528 3.408 -8.528 8.528s3.408 8.528 8.528 8.528h162.128c5.12 0 8.528 -3.408 8.528 -8.528s-3.408 -8.528 -8.528 -8.528"/>
      </g>
    `;
  
    // SVG active icon
    const iconActive = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconActive.setAttribute('id', 'icon-active');
    iconActive.setAttribute('class', 'library-icon hidden');
    iconActive.setAttribute('fill', 'black');
    iconActive.setAttribute('height', '800px');
    iconActive.setAttribute('width', '800px');
    iconActive.setAttribute('viewBox', '0 0 512 512');
    iconActive.innerHTML = `
      <g transform="translate(1 1)">
        <path style="fill:#f9c172;" d="M441.027,374.467c0-24.747,6.827-47.787,18.773-68.267h-256H101.4c-37.547,0-68.267,30.72-68.267,68.267s30.72,68.267,68.267,68.267h102.4h256C447.853,422.253,441.027,399.213,441.027,374.467"/>
        <path style="fill:#E7D6C4;" d="M33.133,374.467c0-37.547,30.72-68.267,68.267-68.267H75.8c-37.547,0-68.267,30.72-68.267,68.267s30.72,68.267,68.267,68.267h25.6C63.853,442.733,33.133,412.013,33.133,374.467"/>
        <polygon style="fill:#f9c172;" points="7.533,306.2 485.4,306.2 485.4,220.867 7.533,220.867"/>
        <path d="M348.867,272.067H186.733c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h162.133c5.12,0,8.533,3.413,8.533,8.533C357.4,268.653,353.987,272.067,348.867,272.067z"/>
      </g>
    `;
  
    // Append SVGs to button
    button.appendChild(iconDefault);
    button.appendChild(iconActive);
    form.appendChild(button);
    document.body.appendChild(form);
  
    // Toggle functionality
    button.addEventListener('click', function () {
      button.classList.toggle('active');
      const isActive = button.classList.contains('active');
      iconDefault.classList.toggle('hidden', isActive);
      iconActive.classList.toggle('hidden', !isActive);
    });
  });
  