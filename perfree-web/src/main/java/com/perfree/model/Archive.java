package com.perfree.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Archive implements Serializable {
    private static final long serialVersionUID = 4900274588193382136L;
    private String date;

    private List<Article> articles;


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}
