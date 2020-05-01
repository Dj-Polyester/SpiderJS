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
    
    app.terminal = vte_terminal_new ();
    gtk_container_add (app.frame, app.terminal);

    connect_signals();
    read_json();



    gtk_widget_show(app.window);
	gtk_main();

    return EXIT_SUCCESS;
}
