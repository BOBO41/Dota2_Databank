package com.xgt.bean.dota;

import com.xgt.generic.PageQueryEntity;

import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;

/**
 * Created by hasee on 2017/12/1.
 */
public class HeroBean extends PageQueryEntity{
    private Integer id;

    private String name;
    @QueryParam("localizedName")
    private String localizedName;

    private String headportraitPath;

    private String heroPath;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocalizedName() {
        return localizedName;
    }

    public void setLocalizedName(String localizedName) {
        this.localizedName = localizedName;
    }

    public String getHeadportraitPath() {
        return headportraitPath;
    }

    public void setHeadportraitPath(String headportraitPath) {
        this.headportraitPath = headportraitPath;
    }

    public String getHeroPath() {
        return heroPath;
    }

    public void setHeroPath(String heroPath) {
        this.heroPath = heroPath;
    }
}
