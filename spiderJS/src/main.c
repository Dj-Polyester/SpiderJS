#include "../include/global.h"



int main(int argc, char **argv)
{

    gtk_init(&argc, &argv); // init Gtk
    
    app.builder = gtk_builder_new_from_resource("/ui/menu.ui");
    app.window		= GTK_WIDGET(gtk_builder_get_object(app.builder, "window"));
    app.url_entry		= GTK_WIDGET(gtk_builder_get_object(app.builder, "url_entry"));
    app.url_combobox		= GTK_WIDGET(gtk_builder_get_object(app.builder, "url_combobox"));
    app.word_entry		= GTK_WIDGET(gtk_builder_get_object(app.builder, "word_entry"));
    app.word_combobox		= GTK_WIDGET(gtk_builder_get_object(app.builder, "word_combobox"));
    app.button		= GTK_WIDGET(gtk_builder_get_object(app.builder, "button"));
    app.url_list_store		= GTK_WIDGET(gtk_builder_get_object(app.builder, "url_list_store"));
    app.key_list_store		= GTK_WIDGET(gtk_builder_get_object(app.builder, "key_list_store"));
    app.frame       = GTK_WIDGET(gtk_builder_get_object(app.builder, "frame"));
    
    app.cssProvider = gtk_css_provider_new();
  	gtk_css_provider_load_from_resource(app.cssProvider, "/ui/theme.css");
  	gtk_style_context_add_provider_for_screen(gdk_screen_get_default(),
                               GTK_STYLE_PROVIDER(app.cssProvider),
                               GTK_STYLE_PROVIDER_PRIORITY_USER);

    connect_signals();
    read_json();



    gtk_widget_show(app.window);
	gtk_main();

    return EXIT_SUCCESS;
}
