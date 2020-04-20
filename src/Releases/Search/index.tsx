import React from 'react';
import Toggle from '../../Components/Toggle'

const toggleButton = (e:any) => {
    e.preventDefault();

};

const ReleaseSearch = () => {
    return (
        <div className="ui form">
            <div className="fields">
                <div className="field">
                    <input placeholder="title" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="year" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="season" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="episode" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="group" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="author" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="resolution" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="source" type="text"/>
                </div>
                <div className="field">
                    <input placeholder="type" type="text"/>
                </div>
                <div className="field">
                    <div className="ui basic icon buttons">
                        <Toggle icon="target" default={true}/>
                        <Toggle icon="certificate" default={true} />
                        <Toggle icon="disk" default={false}/>
                        <Toggle icon="beer" default={false}/>
                    </div>
                </div>

                <div className="field">
                    <div className="ui icon buttons">
                        <button className="ui icon button" title="search">
                            <i className="rocket icon"/>
                        </button>
                        <button className="ui icon button" title="reset">
                            <i className="undo icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ReleaseSearch;
