
import { Cog, FileText, Home, Layers, ShoppingBag, UserCheck, Users } from 'lucide-react';

export const myStructure = (S: any) =>
    S.list()
        .title('Gym Management')
        .items([
            // 1. Singleton: Configuración del Gimnasio (Marca, Logo, Colores)
            S.listItem()
                .title('Brand Configuration')
                .icon(Cog)
                .child(
                    S.document()
                        .schemaType('brand')
                        .documentId('brandConfig') // ID fijo para asegurar que sea único
                        .title('Brand Settings')
                ),

            S.divider(),

            // 2. Gestión de Páginas (Landing Pages)
            S.listItem()
                .title('Pages')
                .icon(Layers)
                .child(
                    S.documentTypeList('landing')
                        .title('Landing Pages')
                        .child((documentId: string) =>
                            S.document()
                                .documentId(documentId)
                                .schemaType('landing')
                        )
                ),

            S.divider(),

            // 3. Grupo de Negocio (Planes, Entrenadores, Clases)
            S.listItem()
                .title('Business Entities')
                .icon(Home)
                .child(
                    S.list()
                        .title('Manage Business')
                        .items([
                            S.listItem()
                                .title('Membership Plans')
                                .icon(ShoppingBag)
                                .child(S.documentTypeList('plan').title('Plans')),

                            S.listItem()
                                .title('Trainers')
                                .icon(Users)
                                .child(S.documentTypeList('trainer').title('Trainers')),

                            S.listItem()
                                .title('Classes')
                                .icon(Layers)
                                .child(S.documentTypeList('classType').title('Classes')),

                            S.listItem()
                                .title('Services')
                                .icon(Layers)
                                .child(S.documentTypeList('service').title('Services')),
                        ])
                ),

            // 4. Grupo de Contenido Social/Marketing
            S.listItem()
                .title('Marketing Content')
                .icon(UserCheck)
                .child(
                    S.list()
                        .title('Marketing')
                        .items([
                            S.listItem()
                                .title('Testimonials')
                                .child(S.documentTypeList('testimonial').title('Testimonials')),

                            S.listItem()
                                .title('FAQs')
                                .child(S.documentTypeList('faq').title('FAQs')),
                        ])
                ),

            S.divider(),

            // 5. Componentes de UI (Secciones reutilizables)
            // Ocultamos esto un poco porque idealmente se crean DESDE la Landing page, no sueltos.
            S.listItem()
                .title('UI Sections Database')
                .icon(FileText)
                .child(
                    S.list()
                        .title('Sections')
                        .items([
                            S.listItem()
                                .title('Hero Sections')
                                .child(S.documentTypeList('heroSection')),
                            S.listItem()
                                .title('Generic Sections')
                                .child(S.documentTypeList('genericSection')),
                            S.listItem()
                                .title('Photo Galleries')
                                .child(S.documentTypeList('gallery')),
                        ])
                ),
        ]);
