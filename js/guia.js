/*
 * Ponto de entrada do guia de estilo (html/design-system.html), que é uma página
 * própria, fora da SPA. Reaproveita os mesmos módulos de menu e feedback.
 */
import { iniciarContraste } from './modules/contraste.js';
import { iniciarMenu } from './modules/menu.js';
import { registrarEventosFeedback } from './modules/feedback.js';

iniciarContraste();
iniciarMenu();
registrarEventosFeedback();
