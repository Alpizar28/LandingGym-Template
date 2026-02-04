import brand from './brand';
import landing from './landing';
import heroSection from './heroSection';
import genericSection from './genericSection';
import service from './service';
import plan from './plan';
import trainer from './trainer';
import classType from './classType';
import testimonial from './testimonial';
import faq from './faq';

import gallery from './gallery';

export const schemaTypes = [
    // Core
    brand,
    landing,

    // Content Types (Entities)
    plan,
    trainer,
    classType,
    testimonial,
    service,
    faq,

    // Page Sections (Components)
    heroSection,
    genericSection,
    gallery,
];
